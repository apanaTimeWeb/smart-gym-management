// RESPONSIBILITY: Opens and closes tenant PostgreSQL transactions behind the framework-neutral UnitOfWork abstraction.
// FLOW: Orchestrator â†’ TypeOrmUnitOfWork â†’ TenantContextService â†’ tenant DataSource.transaction â†’ repositories.
import { Injectable } from '@nestjs/common';

import { CoreUnitOfWork, TransactionContext } from '@/backend_landing/core/database/transaction-context';

import { TenantContextService } from '@/backend_landing/core/tenant/tenant-context.service';

import { DataSource } from 'typeorm';


@Injectable()
export class TypeOrmUnitOfWorkService implements CoreUnitOfWork {
  constructor(private readonly tenantContext: TenantContextService) {}

  /** @description Runs application work inside the trusted tenant DataSource transaction. @param work - Repository-facing transactional work. @returns The work result after commit. */
  async runInTransaction<T>(work: (context: TransactionContext) => Promise<T>): Promise<T> {
    const dataSource: DataSource = await this.tenantContext.resolveTenantDataSource();
    return dataSource.transaction((manager) => work({ manager }));
  }
}
