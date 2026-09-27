// RESPONSIBILITY: Resolves and caches Manager tenant DataSources without creating global ORM roots per feature.
// FLOW: Trusted tenant context -> bounded DataSource cache -> tenant entities/migrations -> repository access.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreTenantEntities } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-entities';
import { ManagerHardening1711000000200 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000200-manager-hardening';
import { ManagerTableNameNormalization1711000000300 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000300-manager-table-name-normalization';
import { ManagerQueryIndexes1711000000400 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000400-manager-query-indexes';
import { ManagerMoneyHardening1711000000500 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000500-manager-money-hardening';
import { ManagerCommunicationsDeliveryJobs1711000000600 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000600-manager-communications-delivery-jobs';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { TIMEOUT_CONFIG } from '@/backend_manager/manager_core/manager_core_config/manager-core-timeout.config';

interface CachedTenantDataSource {
  dataSource: DataSource;
  lastUsedAt: number;
}

@Injectable()
export class ManagerCoreTenantDataSourceManager {
  private readonly cache = new Map<string, CachedTenantDataSource>();

  constructor(private readonly config: ManagerCoreConfigService, private readonly context: ManagerCoreRequestContextService) {}

  /** Returns the trusted tenant DataSource for the current request. */
  async getCurrent(): Promise<DataSource> {
    const databaseName = this.context.get().tenantDatabaseName;
    if (!databaseName) throw new ManagerCoreContextException('Trusted tenant context is missing.', 'TENANT.CONTEXT.MISSING');
    return this.getOrCreate(databaseName);
  }

  /** Creates/reuses a DataSource while enforcing the aggregate connection-pool budget. */
  private async getOrCreate(databaseName: string): Promise<DataSource> {
    const cached = this.cache.get(databaseName);
    if (cached?.dataSource.isInitialized) {
      cached.lastUsedAt = Date.now();
      return cached.dataSource;
    }
    await this.evictIdleIfNeeded();
    const dataSource = new DataSource({
      type: 'postgres',
      host: this.config.tenantDbHost,
      port: this.config.tenantDbPort,
      username: this.config.tenantDbUser,
      password: this.config.tenantDbPassword,
      database: databaseName,
      entities: ManagerCoreTenantEntities,
      migrations: [ManagerHardening1711000000200, ManagerTableNameNormalization1711000000300, ManagerQueryIndexes1711000000400, ManagerMoneyHardening1711000000500,ManagerCommunicationsDeliveryJobs1711000000600],
      synchronize: false,
      extra: {
        max: this.poolSize(),
        min: 0,
        idleTimeoutMillis: this.config.tenantDbIdleTimeoutMs,
        connectionTimeoutMillis: this.config.tenantDbAcquireTimeoutMs,
        statement_timeout: TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS,
      },
    });
    await dataSource.initialize();
    await dataSource.runMigrations();
    this.cache.set(databaseName, { dataSource, lastUsedAt: Date.now() });
    return dataSource;
  }

  /** Computes one pool size so the maximum cached tenant DataSources stay within the aggregate connection budget. */
  private poolSize(): number {
    const pool = Math.floor(this.config.tenantPoolBudget / Math.max(1, this.config.tenantDbMaxCached));
    if (pool < 1) throw new ManagerCoreContextException('Tenant DB pool budget must cover at least one connection per cached DataSource.', 'TENANT.DB.POOL_BUDGET');
    return pool;
  }

  /** Evicts the least-recently-used idle tenant datasource when the cache reaches its configured ceiling. */
  private async evictIdleIfNeeded(): Promise<void> {
    if (this.cache.size < this.config.tenantDbMaxCached) return;
    const oldest = [...this.cache.entries()].sort((a, b) => a[1].lastUsedAt - b[1].lastUsedAt)[0];
    if (!oldest) return;
    await oldest[1].dataSource.destroy();
    this.cache.delete(oldest[0]);
  }

  /** Releases all cached DataSources during application shutdown. */
  async destroyAll(): Promise<void> {
    await Promise.all([...this.cache.values()].map(({ dataSource }) => dataSource.destroy().catch(() => undefined)));
    this.cache.clear();
  }
}
