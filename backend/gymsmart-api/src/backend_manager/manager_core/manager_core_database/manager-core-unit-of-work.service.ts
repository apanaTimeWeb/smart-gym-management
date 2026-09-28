// RESPONSIBILITY: Owns the unit-of-work transaction boundary for Manager backend mutations.
// FLOW: Use-case callback -> tenant DataSource transaction -> transaction context -> commit/rollback.
import { Injectable } from '@nestjs/common';

import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';

import { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';

@Injectable()
export class ManagerCoreUnitOfWorkService {
  constructor(private readonly tenants: ManagerCoreTenantDatasourceService) {}

  /**
   * @description Executes a callback inside one tenant database transaction.
   * @param work - Callback that receives the transaction-bound context.
   * @returns The callback result after a successful commit.
   * @throws Propagates the underlying transaction error after rollback.
   */
  async run<T>(work: (context: ManagerCoreTransactionContext) => Promise<T>): Promise<T> {
    const dataSource = await this.tenants.getDataSource();
    return dataSource.transaction(async (manager) => work(new ManagerCoreTransactionContext(manager)));
  }
}
