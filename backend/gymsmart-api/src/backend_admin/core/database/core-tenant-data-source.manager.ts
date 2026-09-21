// RESPONSIBILITY: Lazily caches TypeORM DataSources for authorized tenant databases while enforcing a global per-process pool budget.
// FLOW: Trusted tenant context → master tenant metadata → bounded DataSource → feature repository.

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { CoreMasterTenantLookupService } from '@/backend_admin/core/tenant/core-master-tenant-lookup.service';
import { CoreRequestContextService } from '@/backend_admin/core/context/core-request-context.service';
import { CoreTenantEntityRegistry } from '@/backend_admin/core/database/core-tenant-entity-registry';

@Injectable()
export class CoreTenantDataSourceManager implements OnModuleDestroy {
  private readonly sources = new Map<string, DataSource>();
  private readonly poolBudget = 20;

  constructor(
    private readonly requestContext: CoreRequestContextService,
    private readonly tenantLookup: CoreMasterTenantLookupService,
    private readonly config: ConfigService,
  ) {}

  /** @description Returns the DataSource for the current trusted tenant. @returns Initialized tenant DataSource. @throws Error when tenant context is missing. */
  async getCurrent(): Promise<DataSource> { return this.getForTenant(this.requestContext.get().tenantId); }

  /** @description Resolves and caches one tenant DataSource using bounded pool sizing across all active tenants. @param tenantId Authorized tenant UUID. @returns Initialized tenant DataSource. */
  async getForTenant(tenantId: string): Promise<DataSource> {
    const existing = this.sources.get(tenantId);
    if (existing?.isInitialized) return existing;
    const databaseName = await this.tenantLookup.findTenantDatabaseNameOrThrow(tenantId);
    const configuredMax = Math.max(1, Number(this.config.get<number>('TENANT_DB_POOL_MAX', 5)));
    const maxActiveSources = Math.max(1, Math.floor(this.poolBudget / configuredMax));
    if (this.sources.size >= maxActiveSources) await this.evictLeastRecentlyCreated();
    const dataSource = new DataSource({
      type: 'postgres',
      host: this.config.getOrThrow<string>('TENANT_DB_HOST'),
      port: this.config.get<number>('TENANT_DB_PORT', 5432),
      username: this.config.getOrThrow<string>('TENANT_DB_USER'),
      password: this.config.getOrThrow<string>('TENANT_DB_PASSWORD'),
      database: databaseName,
      entities: CoreTenantEntityRegistry,
      migrations: [__dirname + '/migrations/tenant/*.{js,ts}'],
      migrationsRun: true,
      synchronize: false,
      extra: { max: configuredMax, connectionTimeoutMillis: 30000, idleTimeoutMillis: 10000, statement_timeout: 3000 },
    });
    await dataSource.initialize();
    this.sources.set(tenantId, dataSource);
    return dataSource;
  }

  /** @description Evicts the oldest initialized tenant DataSource so the global connection budget remains bounded. @returns Promise completion. */
  private async evictLeastRecentlyCreated(): Promise<void> {
    const first = this.sources.entries().next().value as [string, DataSource] | undefined;
    if (!first) return;
    this.sources.delete(first[0]);
    if (first[1].isInitialized) await first[1].destroy();
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all(Array.from(this.sources.values()).filter((source) => source.isInitialized).map((source) => source.destroy()));
  }
}
