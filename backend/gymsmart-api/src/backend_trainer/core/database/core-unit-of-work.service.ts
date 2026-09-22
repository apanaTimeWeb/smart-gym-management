// RESPONSIBILITY: Owns tenant transaction boundaries while exposing only an application-level transaction context.
// FLOW: Feature orchestrator → UnitOfWork → CoreTransactionContext → repositories.

import { Injectable } from '@nestjs/common';
import type { EntityManager } from 'typeorm';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/core/database/core-transaction.context';

@Injectable()
export class CoreUnitOfWorkService {
  constructor(private readonly resolver: CoreTenantDataSourceResolver) {}

  /** Runs an all-or-nothing mutation inside one tenant transaction. */
  async execute<T>(callback: (context: CoreTransactionContext) => Promise<T>): Promise<T> {
    const dataSource = await this.resolver.getDataSource();
    return dataSource.transaction(async (manager: EntityManager) => callback(new CoreTransactionContext(manager)));
  }
}
