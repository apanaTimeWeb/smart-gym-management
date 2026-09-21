// RESPONSIBILITY: Provides the shared TypeORM repository boundary with soft-delete filtering and transaction-aware manager resolution.
// FLOW: Feature repository -> CoreBaseRepository -> current transaction/root manager -> TypeORM.

import { CoreRequestContextService } from '@/backend_auth/core/context/core-request-context';
import { CoreEntityNotFoundException } from '@/backend_auth/core/exceptions/core-app.exception';

import { DataSource, EntityManager, ObjectLiteral, Repository } from 'typeorm';
import type { CoreEntityClass } from '@/backend_auth/core/database/core-database.interfaces';

export abstract class CoreBaseRepository<TEntity extends ObjectLiteral & { id: string; deletedAt: Date | null }> {
  protected constructor(
    private readonly entityClass: CoreEntityClass<TEntity>,
    private readonly dataSource: DataSource,
    private readonly requestContext: CoreRequestContextService,
  ) {}

  protected getRepository(): Repository<TEntity> { return this.resolveManager().getRepository(this.entityClass); }
  protected resolveManager(): EntityManager { return this.requestContext.get()?.entityManager ?? this.dataSource.manager; }
  protected getRequestContext(): ReturnType<CoreRequestContextService['get']> { return this.requestContext.get(); }

  /** @description Finds a non-deleted entity by UUID. @param id - Entity UUID. @returns Entity or null. */
  async findById(id: string): Promise<TEntity | null> {
    return this.getRepository().findOne({ where: { id, deletedAt: null } as never });
  }

  /** @description Finds a non-deleted entity by UUID or throws. @param id - Entity UUID. @returns Entity. @throws CoreEntityNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<TEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new CoreEntityNotFoundException(this.entityClass.name);
    return entity;
  }

  /** @description Soft-deletes an entity row. @param id - Entity UUID. @returns void. */
  async softDelete(id: string): Promise<void> { await this.getRepository().softDelete(id); }
}
