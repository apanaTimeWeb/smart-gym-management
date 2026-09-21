// RESPONSIBILITY: Resolves request-scoped tenant PostgreSQL DataSources under a global connection-pool budget.
// FLOW: actor + tenant -> authorization -> bounded LRU cache -> tenant DataSource.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TenantAuthorizationService } from '@/backend_superadmin/core/tenancy/tenant-authorization.service';

@Injectable()
export class TenantDataSourceResolverService implements OnModuleDestroy {
  private readonly dataSources = new Map<string, DataSource>();

  constructor(
    private readonly config: ConfigService,
    private readonly authorization: TenantAuthorizationService,
  ) {}

  /** Returns an initialized tenant DataSource after authorization and pool-budget enforcement. */
  async resolve(actorId: string, tenantId: string): Promise<DataSource> {
    await this.authorization.authorize(actorId, tenantId);
    const cached = this.dataSources.get(tenantId);
    if (cached) {
      this.promote(tenantId, cached);
      return cached;
    }
    await this.evictIfNecessary();
    const baseUrl = new URL(this.config.getOrThrow<string>('app.databaseUrl'));
    const safeTenantId = tenantId.replace(/[^a-zA-Z0-9_]/g, '_');
    const dbName = `${this.config.getOrThrow<string>('app.tenantDatabasePrefix')}${safeTenantId}`;
    baseUrl.pathname = `/${dbName}`;
    const perTenantMax = this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase');
    const dataSource = new DataSource({
      type: 'postgres',
      url: baseUrl.toString(),
      synchronize: false,
      migrationsRun: false,
      extra: {
        max: perTenantMax,
        connectionTimeoutMillis: this.config.getOrThrow<number>('app.databaseAcquireTimeoutMs'),
        idleTimeoutMillis: this.config.getOrThrow<number>('app.databaseIdleTimeoutMs'),
        statement_timeout: this.config.getOrThrow<number>('app.databaseStatementTimeoutMs'),
      },
    });
    await dataSource.initialize();
    this.dataSources.set(tenantId, dataSource);
    return dataSource;
  }

  /** Promotes a recently-used tenant connection to the newest LRU position. */
  private promote(tenantId: string, dataSource: DataSource): void {
    this.dataSources.delete(tenantId);
    this.dataSources.set(tenantId, dataSource);
  }

  /** Enforces the application-wide tenant pool budget before opening a new connection pool. */
  private async evictIfNecessary(): Promise<void> {
    const totalPerTenant = this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase');
    const budget = this.config.getOrThrow<number>('app.tenantPoolBudget');
    const maxDataSources = Math.max(1, Math.floor(budget / totalPerTenant));
    while (this.dataSources.size >= maxDataSources) {
      const oldest = this.dataSources.entries().next().value as [string, DataSource] | undefined;
      if (!oldest) return;
      this.dataSources.delete(oldest[0]);
      if (oldest[1].isInitialized) await oldest[1].destroy();
    }
  }

  /** Closes all cached tenant DataSources during graceful shutdown. */
  async onModuleDestroy(): Promise<void> {
    await Promise.all([...this.dataSources.values()].filter((item) => item.isInitialized).map((item) => item.destroy()));
    this.dataSources.clear();
  }
}
