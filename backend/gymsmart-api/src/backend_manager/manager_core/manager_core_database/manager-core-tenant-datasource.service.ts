// RESPONSIBILITY: Exposes tenant-scoped repositories resolved from trusted AsyncLocalStorage context.
// FLOW: Trusted request context -> tenant DataSource manager -> TypeORM repository.
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { ManagerCoreTenantDataSourceManager } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-data-source.manager';

@Injectable()
export class ManagerCoreTenantDatasourceService implements OnApplicationShutdown {
  constructor(private readonly manager: ManagerCoreTenantDataSourceManager) {}

  /** Resolves the current trusted tenant DataSource. */
  async getDataSource(): Promise<DataSource> {
    return this.manager.getCurrent();
  }

  /** Resolves a repository from the current trusted tenant DataSource or active transaction. */
  async getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
    return (await this.manager.getCurrent()).getRepository(entity);
  }

  /** Destroys cached tenant connections during graceful shutdown. */
  async onApplicationShutdown(): Promise<void> {
    await this.manager.destroyAll();
  }
}
