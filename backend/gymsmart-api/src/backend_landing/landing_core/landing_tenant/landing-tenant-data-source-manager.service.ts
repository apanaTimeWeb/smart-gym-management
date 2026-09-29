// RESPONSIBILITY: Caches tenant DataSources under a process-wide connection-pool budget.
// FLOW: Trusted tenant -> config -> TypeORM DataSource -> bounded cache.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getLandingDatabasePoolConfig } from '@/backend_landing/landing_core/landing_config/landing-database.config';
import { buildTenantDataSourceOptions } from '@/backend_landing/landing_core/landing_database/landing-tenant-data-source-options';
import { LandingMasterTenantEntity } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.entity';

import { DataSource } from 'typeorm';

/**
 * Intent: Ensure tenant databases are isolated while preventing an unbounded number of PostgreSQL pools.
 * Edge Cases: A projected pool above the global cap is rejected before a new connection is opened.
 * Side Effects: DataSource initialization opens database connections and shutdown destroys them.
 * AI Notes: Never bypass the master tenant registry or construct pools in feature services.
 */
@Injectable()
export class LandingTenantDataSourceManagerService implements OnModuleDestroy {
  private readonly dataSources = new Map<string, DataSource>();
  private budgetLock: Promise<void> = Promise.resolve();

  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-data-source-manager.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(private readonly config: ConfigService) {}

  /**
   * Intent: Reuse or initialize the tenant DataSource for one trusted master registry row.
   * Edge Cases: Budget overflow fails closed; partially initialized sources are not cached.
   * Side Effects: Initializes a TypeORM connection and loads tenant entity/migration metadata.
   * AI Notes: The caller must provide a tenant registry object already authorized by the master database.
   */
  async getOrCreate(tenant: LandingMasterTenantEntity): Promise<DataSource> {
    return this.withBudgetLock(async () => {
      const existing = this.dataSources.get(tenant.id);
      if (existing?.isInitialized) return existing;
      const pool = getLandingDatabasePoolConfig(this.config);
      if ((this.dataSources.size + 1) * pool.tenantMax > pool.totalTenantMax) {
        throw new Error('TENANT_POOL_BUDGET_EXCEEDED');
      }
      const masterDb = this.config.getOrThrow<{ host: string; port: number; username: string; password: string }>('app.masterDb');
      const dataSource = new DataSource(buildTenantDataSourceOptions(tenant.databaseName, masterDb, pool));
      try {
        await dataSource.initialize();
        this.dataSources.set(tenant.id, dataSource);
        return dataSource;
      } catch (error: unknown) {
        if (dataSource.isInitialized) await dataSource.destroy();
        throw error;
      }
    });
  }

  /**
   * Intent: Release one tenant connection pool before test database destruction or controlled eviction.
   * Edge Cases: Missing cached sources are treated as already released.
   * Side Effects: Closes database connections.
   * AI Notes: Always release before DROP DATABASE.
   */
  async destroy(tenantId: string): Promise<void> {
    await this.withBudgetLock(async () => {
      const dataSource = this.dataSources.get(tenantId);
      if (!dataSource) return;
      if (dataSource.isInitialized) await dataSource.destroy();
      this.dataSources.delete(tenantId);
    });
  }

  /**
   * Intent: Gracefully release all tenant pools during shutdown.
   * Edge Cases: Uninitialized sources are skipped.
   * Side Effects: Closes database connections.
   * AI Notes: Keep this lifecycle hook free of business logic.
   */
  async onModuleDestroy(): Promise<void> {
    await this.withBudgetLock(async () => {
      for (const dataSource of this.dataSources.values()) {
        if (dataSource.isInitialized) await dataSource.destroy();
      }
      this.dataSources.clear();
    });
  }

  /**
   * @description Serializes tenant pool initialization and destruction so the aggregate connection budget is checked atomically with lifecycle changes.
   * @param work - One connection lifecycle operation that reads or mutates the cached DataSource set.
   * @returns The lifecycle operation result after exclusive access is released.
   * @throws Propagates any connection lifecycle error raised by the supplied work.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-data-source-manager.service.withBudgetLock at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private async withBudgetLock<T>(work: () => Promise<T>): Promise<T> {
    const previous = this.budgetLock;
    let release!: () => void;
    this.budgetLock = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    try {
      return await work();
    } finally {
      release();
    }
  }
}
