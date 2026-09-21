// RESPONSIBILITY: Caches one TypeORM DataSource per trusted tenant database within a bounded process budget.
// FLOW: Trusted Tenant → TenantDataSourceManager → TypeORM DataSource cache.
import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { MasterTenantEntity } from '@/backend_landing/core/tenant/master-tenant.entity';

import { buildTenantDataSourceOptions } from '@/backend_landing/core/database/tenant-data-source-options';

import { DATABASE_CONFIG } from '@/backend_landing/core/config/database.config';


@Injectable()
export class TenantDataSourceManagerService implements OnModuleDestroy {
  private readonly dataSources = new Map<string, DataSource>();

  /** @description Returns an initialized DataSource for a trusted tenant and enforces the process-wide tenant pool budget. @param tenant - Active tenant registry row. @returns Initialized tenant DataSource. @throws Error when the configured total tenant pool budget would be exceeded. */
  async getOrCreate(tenant: MasterTenantEntity): Promise<DataSource> {
    const existing = this.dataSources.get(tenant.id);
    if (existing?.isInitialized) return existing;
    const projectedPool = (this.dataSources.size + 1) * DATABASE_CONFIG.tenant.max;
    if (projectedPool > DATABASE_CONFIG.totalTenantMax) throw new Error('TENANT_POOL_BUDGET_EXCEEDED');
    const dataSource = new DataSource(buildTenantDataSourceOptions(tenant.databaseName));
    await dataSource.initialize();
    this.dataSources.set(tenant.id, dataSource);
    return dataSource;
  }

  /**
   * @description Releases one cached tenant DataSource before disposable test database cleanup.
   * @param tenantId - Tenant UUID whose connection pool should be destroyed.
   * @returns Resolves after the cached DataSource is destroyed when present.
   */
  async destroy(tenantId: string): Promise<void> {
    const dataSource = this.dataSources.get(tenantId);
    if (!dataSource) return;
    if (dataSource.isInitialized) await dataSource.destroy();
    this.dataSources.delete(tenantId);
  }

  /** @description Closes all cached tenant connections during graceful shutdown. @returns Resolves after all initialized pools are closed. */
  async onModuleDestroy(): Promise<void> {
    for (const dataSource of this.dataSources.values()) {
      if (dataSource.isInitialized) await dataSource.destroy();
    }
  }
}
