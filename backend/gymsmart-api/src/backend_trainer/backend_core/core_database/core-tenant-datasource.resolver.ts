// RESPONSIBILITY: Provides tenant-scoped TypeORM repositories without exposing tenant connection lifecycle to feature modules.
// FLOW: Feature repository → CoreTenantDatasourceResolver → CoreTenantDataSourceManager → tenant DataSource.

import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { CoreTenantDataSourceManager } from '@/backend_trainer/backend_core/core_database/core-tenant-data-source.manager';


/**
 * Intent: Defines the CoreTenantDatasourceResolver boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreTenantDatasourceResolver {
  constructor(private readonly manager: CoreTenantDataSourceManager) {}

  /** Returns the trusted current tenant DataSource. */
  async getDataSource(): Promise<DataSource> {
    return this.manager.getCurrent();
  }

  /** Returns a repository from the trusted current tenant DataSource. */
  async getRepository<T extends ObjectLiteral>(target: EntityTarget<T>): Promise<Repository<T>> {
    return (await this.manager.getCurrent()).getRepository(target);
  }
}
