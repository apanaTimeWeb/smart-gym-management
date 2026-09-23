// RESPONSIBILITY: Resolves request-scoped tenant PostgreSQL DataSources under a global connection-pool budget.
// FLOW: actor + tenant -> authorization -> bounded LRU cache -> tenant DataSource.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { SuperadminTenantAuthorizationService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-authorization.service';

@Injectable()
export class SuperadminTenantDatasourceResolverService implements OnModuleDestroy {
  private readonly dataSources = new Map<string, DataSource>();

  constructor(private readonly config: ConfigService, private readonly authorization: SuperadminTenantAuthorizationService) {}

  /** Returns an initialized tenant DataSource after authorization and pool-budget enforcement. */
  async resolve(actorId: string, tenantId: string): Promise<DataSource> {
    await this.authorization.authorize(actorId, tenantId);
    const cached = this.dataSources.get(tenantId);
    if (cached) return this.getCached(tenantId, cached);
    await this.evictIfNecessary();
    const dataSource = await this.createTenantDataSource(tenantId);
    this.dataSources.set(tenantId, dataSource);
    return dataSource;
  }

  /** Promotes a recently-used tenant connection to the newest LRU position. */
  private getCached(tenantId: string, dataSource: DataSource): DataSource {
    this.dataSources.delete(tenantId); this.dataSources.set(tenantId, dataSource); return dataSource;
  }

  /** Creates a tenant connection using the shared bounded pool configuration. */
  private async createTenantDataSource(tenantId: string): Promise<DataSource> {
    const baseUrl = new URL(this.config.getOrThrow<string>('app.databaseUrl'));
    const safeTenantId = tenantId.replace(/[^a-zA-Z0-9_]/g, '_');
    baseUrl.pathname = `/${this.config.getOrThrow<string>('app.tenantDatabasePrefix')}${safeTenantId}`;
    const dataSource = new DataSource({ type: 'postgres', url: baseUrl.toString(), synchronize: false, migrationsRun: false, entities: [join(__dirname, '../../superadmin_modules/**/*.entity.{js,ts}')], extra: this.poolOptions() });
    await dataSource.initialize(); return dataSource;
  }

  /** Returns the explicit cross-tenant pool safety settings. */
  private poolOptions(): Record<string, number> {
    return { max: this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase'), connectionTimeoutMillis: this.config.getOrThrow<number>('app.databaseAcquireTimeoutMs'), idleTimeoutMillis: this.config.getOrThrow<number>('app.databaseIdleTimeoutMs'), statement_timeout: this.config.getOrThrow<number>('app.databaseStatementTimeoutMs') };
  }

  /** Enforces the application-wide tenant pool budget before opening a new connection pool. */
  private async evictIfNecessary(): Promise<void> {
    const totalPerTenant = this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase');
    const budget = this.config.getOrThrow<number>('app.tenantPoolBudget');
    const maxDataSources = Math.max(1, Math.floor(budget / totalPerTenant));
    while (this.dataSources.size >= maxDataSources) await this.evictOldest();
  }

  /** Removes the least-recently-used initialized tenant DataSource. */
  private async evictOldest(): Promise<void> {
    const oldest = this.dataSources.entries().next().value as [string, DataSource] | undefined;
    if (!oldest) return;
    this.dataSources.delete(oldest[0]);
    if (oldest[1].isInitialized) await oldest[1].destroy();
  }

  /** Releases one tenant DataSource before permanent tenant database deletion. */
  async release(tenantId: string): Promise<void> {
    const dataSource = this.dataSources.get(tenantId);
    if (!dataSource) return;
    this.dataSources.delete(tenantId);
    if (dataSource.isInitialized) await dataSource.destroy();
  }

  /** Closes all cached tenant DataSources during graceful shutdown. */
  async onModuleDestroy(): Promise<void> {
    await Promise.all([...this.dataSources.values()].filter((item) => item.isInitialized).map((item) => item.destroy()));
    this.dataSources.clear();
  }
}
