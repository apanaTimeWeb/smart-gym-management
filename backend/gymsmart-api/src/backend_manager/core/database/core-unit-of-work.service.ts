// RESPONSIBILITY: Transaction boundary abstraction; ORM transaction objects never cross into business services.
// FLOW: Feature orchestrator -> CoreUnitOfWorkService -> transaction callback -> repository context -> commit/rollback.
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';

import { CoreTenantDatasourceService } from '@/core/database/core-tenant-datasource.service';

export class CoreTransactionContext {
  constructor(private readonly manager:EntityManager) {}
  /** @description Returns a repository bound to the current transaction. @param entity - Entity target. @returns Transaction-bound repository. */
  getRepository<T>(entity:EntityTarget<T>):Repository<T> { return this.manager.getRepository(entity); }
}

@Injectable()
export class CoreUnitOfWorkService {
  constructor(private readonly tenants:CoreTenantDatasourceService) {}
  /** @description Executes an all-or-nothing operation in the authorized tenant database. @param work - Transaction callback. @returns Callback result after commit. */
  async run<T>(work:(context:CoreTransactionContext)=>Promise<T>):Promise<T> { const ds=await this.tenants.getDataSource(); return ds.transaction(async(manager)=>work(new CoreTransactionContext(manager))); }
}
