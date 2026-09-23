// RESPONSIBILITY: Owns the unit-of-work transaction boundary for Manager backend mutations.
// FLOW: Use-case callback -> tenant DataSource transaction -> transaction context -> commit/rollback.
import { Injectable } from '@nestjs/common';

import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

import { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';

@Injectable()
export class CoreUnitOfWorkService {
  constructor(private readonly tenants: CoreTenantDatasourceService) {}

  /**
   * @description Executes a callback inside one tenant database transaction.
   * @param work - Callback that receives the transaction-bound context.
   * @returns The callback result after a successful commit.
   * @throws Propagates the underlying transaction error after rollback.
   */
  async run<T>(work: (context: CoreTransactionContext) => Promise<T>): Promise<T> {
    const dataSource = await this.tenants.getDataSource();
    return dataSource.transaction(async (manager) => work(new CoreTransactionContext(manager)));
  }
}
