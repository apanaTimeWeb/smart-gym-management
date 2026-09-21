// RESPONSIBILITY: Provides shared transaction-aware repository helpers, UUID lookup semantics, and soft-delete filtering.
// FLOW: Feature repository â†’ CoreBaseRepository â†’ TypeORM repository â†’ PostgreSQL.
import { NotFoundException } from '@nestjs/common';

import { IsNull, Repository } from 'typeorm';

import type { EntityTarget } from 'typeorm';
import { TransactionContext } from '@/backend_landing/core/database/transaction-context';
import type { CoreBaseEntity } from '@/backend_landing/core/database/base.entity';


export abstract class CoreBaseRepository<TEntity extends CoreBaseEntity> {
  private readonly repositoryCache = new WeakMap<object, Repository<TEntity>>();

  protected constructor(private readonly entityTarget: EntityTarget<TEntity>) {}

  /**
   * @description Resolves the concrete ORM repository from the active transaction manager and caches it per manager.
   * @param context - Active transaction context.
   * @returns TypeORM repository bound to the active transaction.
   */
  protected repositoryFor(context: TransactionContext): Repository<TEntity> {
    const manager = context.manager;
    const cached = this.repositoryCache.get(manager);
    if (cached) return cached;
    const repository = manager.getRepository(this.entityTarget);
    this.repositoryCache.set(manager, repository);
    return repository;
  }

  /**
   * @description Finds one non-deleted entity by UUID using the active transaction manager.
   * @param context - Active transaction context.
   * @param id - Entity UUID.
   * @returns Entity or null when it does not exist or is soft-deleted.
   */
  async findById(context: TransactionContext, id: string): Promise<TEntity | null> {
    return this.repositoryFor(context).findOne({ where: { id, deletedAt: IsNull() } as never });
  }

  /**
   * @description Finds one non-deleted entity or fails immediately.
   * @param context - Active transaction context.
   * @param id - Entity UUID.
   * @returns Non-deleted entity.
   * @throws NotFoundException when the entity does not exist.
   */
  async findByIdOrThrow(context: TransactionContext, id: string): Promise<TEntity> {
    const entity = await this.findById(context, id);
    if (!entity) throw new NotFoundException(`Resource ${id} was not found.`);
    return entity;
  }
}
