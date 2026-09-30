// RESPONSIBILITY: Resolves and caches tenant PostgreSQL DataSources while enforcing the global aggregate pool budget.
// FLOW: Trusted tenant context → master tenant metadata → bounded DataSource cache → tenant repositories.

import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, IsNull } from 'typeorm';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreTenantPoolBudgetException } from '@/backend_trainer/backend_core/core_errors/core-tenant-pool-budget.exception';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreTenantEntity } from '@/backend_trainer/backend_core/core_database/core-tenant.entity';
import { CoreTenantSchemaMigration } from '@/backend_trainer/backend_core/core_database/core-tenant-schema.migration';
import { CoreTenantSchemaRepair20260922Migration } from '@/backend_trainer/backend_core/core_database/core-tenant-schema-repair-2026-09-22.migration';
import { CoreTenantSchemaRepair20260923Migration } from '@/backend_trainer/backend_core/core_database/core-tenant-schema-repair-2026-09-23.migration';
import { CoreTenantEnumNormalization20260923Migration } from '@/backend_trainer/backend_core/core_database/core-tenant-enum-normalization-2026-09-23.migration';
import { CoreTrainerSessionRecurrenceEndDate20260924Migration } from '@/backend_trainer/backend_core/core_database/core-trainer-session-recurrence-end-date-2026-09-24.migration';
import * as tenantEntities from '@/backend_trainer/backend_core/core_database/core-tenant-entities';


/**
 * Intent: Defines the CoreTenantDataSourceManager boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreTenantDataSourceManager implements OnApplicationShutdown {
  private readonly dataSources = new Map<string, DataSource>();
  private readonly creatingDataSources = new Map<string, Promise<DataSource>>();
  private readonly allocatedPoolSizes = new Map<string, number>();
  private allocationChain: Promise<void> = Promise.resolve();

  constructor(
    @InjectDataSource() private readonly master: DataSource,
    private readonly config: CoreConfigService,
  ) {}

  /** Returns the trusted current tenant DataSource, creating it only after master authorization succeeds. */
  async getCurrent(): Promise<DataSource> {
    const tenantId = CoreRequestContext.getTenantIdOrThrow();
    const cached = this.dataSources.get(tenantId);
    if (cached?.isInitialized) return cached;
    const pending = this.creatingDataSources.get(tenantId);
    if (pending) return pending;
    const creation = this.createForTenant(tenantId);
    this.creatingDataSources.set(tenantId, creation);
    try {
      return await creation;
    } finally {
      this.creatingDataSources.delete(tenantId);
    }
  }

  /** Creates one tenant DataSource while serializing pool-budget reservation across concurrent tenant starts. */
  private async createForTenant(tenantId: string): Promise<DataSource> {
    const tenant = await this.master.getRepository(CoreTenantEntity).findOne({ where: { id: tenantId, isActive: true, deletedAt: IsNull() } });
    if (!tenant) throw new CoreNotFoundException('TENANT', tenantId);

    let releaseReservation!: () => void;
    const previous = this.allocationChain;
    this.allocationChain = new Promise<void>((resolve) => { releaseReservation = resolve; });
    await previous;

    const totalBudget = this.config.getTenantTotalPoolMax();
    const allocated = [...this.allocatedPoolSizes.values()].reduce((sum, value) => sum + value, 0);
    const requested = Math.min(this.config.getTenantPoolMax(), totalBudget - allocated);
    if (requested < 1) {
      releaseReservation();
      throw new CoreTenantPoolBudgetException();
    }

    const dataSource = new DataSource({
      type: 'postgres',
      ...this.config.getTenantDatabase(),
      database: tenant.databaseName,
      entities: Object.values(tenantEntities),
      migrations: [CoreTenantSchemaMigration, CoreTenantSchemaRepair20260922Migration, CoreTenantSchemaRepair20260923Migration, CoreTenantEnumNormalization20260923Migration, CoreTrainerSessionRecurrenceEndDate20260924Migration],
      synchronize: false,
    });
    const tenantDatabase = this.config.getTenantDatabase();
    dataSource.setOptions({ extra: { ...tenantDatabase.extra, max: requested } });

    try {
      await dataSource.initialize();
      this.dataSources.set(tenantId, dataSource);
      this.allocatedPoolSizes.set(tenantId, requested);
      return dataSource;
    } catch (error: unknown) {
      if (dataSource.isInitialized) await dataSource.destroy();
      throw error;
    } finally {
      releaseReservation();
    }
  }

  /** Closes all cached tenant DataSources during graceful application shutdown. */
  async onApplicationShutdown(): Promise<void> {
    for (const dataSource of this.dataSources.values()) {
      if (dataSource.isInitialized) await dataSource.destroy();
    }
    this.dataSources.clear();
    this.creatingDataSources.clear();
    this.allocatedPoolSizes.clear();
  }
}
