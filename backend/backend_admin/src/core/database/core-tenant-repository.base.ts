// RESPONSIBILITY: Provides the canonical tenant-scoped repository boundary and soft-delete primitives for all feature repositories.
// FLOW: Feature repository → CoreTenantRepositoryBase → tenant DataSource → TypeORM repository.

import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { CoreTenantDataSourceManager } from '@/core/database/core-tenant-data-source.manager';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

export abstract class CoreTenantRepositoryBase<TEntity extends CoreBaseEntity & ObjectLiteral> {
  protected constructor(protected readonly tenantManager: CoreTenantDataSourceManager) {}

  /** @description Resolves the current tenant repository using AsyncLocalStorage-backed tenant context. @param target TypeORM entity target. @returns Tenant-scoped TypeORM repository. */
  protected async repositoryFor(target: EntityTarget<TEntity>): Promise<Repository<TEntity>> {
    const source: DataSource = await this.tenantManager.getCurrent();
    return source.getRepository(target);
  }

  /** @description Applies the canonical soft-delete operation without physically removing tenant data. @param id Entity UUID. @param target Entity target. @returns Promise completion. */
  protected async softDeleteRecord(id: string, target: EntityTarget<TEntity>): Promise<void> {
    const repository = await this.repositoryFor(target);
    await repository.softDelete(id);
  }
}
