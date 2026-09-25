// RESPONSIBILITY: Provides the canonical tenant-scoped repository boundary and soft-delete primitives for all feature repositories.
// FLOW: Feature repository â†’ AdminCoreTenantRepositoryBase â†’ tenant DataSource â†’ TypeORM repository.
import { NotFoundException } from '@nestjs/common';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';

/**
 * @description Defines the AdminCoreTenantRepositoryBase boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export abstract class AdminCoreTenantRepositoryBase<TEntity extends AdminCoreBaseEntity & ObjectLiteral> {
  protected constructor(protected readonly tenantManager: AdminCoreTenantDataSourceManager) {}

  /** @description Resolves the current tenant repository using AsyncLocalStorage-backed tenant context. @param target TypeORM entity target. @returns Tenant-scoped TypeORM repository. */
  protected async repositoryFor(target: EntityTarget<TEntity>): Promise<Repository<TEntity>> {
    return this.tenantManager.getCurrentRepository(target);
  }

  /** @description Captures an entity snapshot before a repository mutation so the audit layer can persist accurate oldValue metadata. @param entity Entity state before mutation. @returns void. */
  protected captureMutationBefore(entity: TEntity): void {
    this.tenantManager.captureMutationBefore(entity);
  }

  /** @description Applies the canonical soft-delete operation without physically removing tenant data and captures the pre-delete state first. @param id Entity UUID. @param target Entity target. @returns Promise completion. */
  protected async softDeleteRecord(id: string, target: EntityTarget<TEntity>): Promise<void> {
    const repository = await this.repositoryFor(target);
    const entity = await repository.findOne({ where: { id: id as any } });
    if (!entity) throw new NotFoundException({ message: 'Requested resource was not found.', errorCode: 'CORE.ENTITY.NOT_FOUND' });
    this.captureMutationBefore(entity);
    await repository.softDelete(id);
  }
}
