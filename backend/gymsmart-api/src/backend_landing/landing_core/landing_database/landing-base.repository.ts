// RESPONSIBILITY: Provides shared transaction-aware repository helpers, UUID lookup semantics, and soft-delete filtering.
// FLOW: Feature repository -> LandingBaseRepository -> active transaction manager -> TypeORM repository -> PostgreSQL.
import { NotFoundException } from '@nestjs/common';

import { IsNull, Repository } from 'typeorm';

import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

import type { EntityTarget, FindOptionsWhere } from 'typeorm';
import type { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';

/**
 * Intent: Keep ORM access entirely inside repository adapters while providing common UUID and soft-delete behavior.
 * Edge Cases: Repository access outside a UnitOfWork fails closed; deleted entities are never returned by default helpers.
 * Side Effects: Executes database reads only through the current transaction manager.
 * AI Notes: Do not add application business logic or expose TypeORM objects outside repository implementations.
 */
export abstract class LandingBaseRepository<TEntity extends LandingBaseEntity> {
  private readonly repositoryCache = new WeakMap<object, Repository<TEntity>>();

  
  /**
   * Intent: Preserve the single responsibility of landing-base.repository.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
protected constructor(
    private readonly entityTarget: EntityTarget<TEntity>,
    private readonly transactionContext: LandingOrmTransactionContextService,
  ) {}

  /**
   * @description Resolves the concrete ORM repository from the active infrastructure transaction context.
   * @returns TypeORM repository bound to the current transaction.
   * @throws Error when no active transaction exists.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-base.repository.repositoryFor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
protected repositoryFor(): Repository<TEntity> {
    const manager = this.transactionContext.getManager();
    const cached = this.repositoryCache.get(manager);
    if (cached) return cached;
    const repository = manager.getRepository(this.entityTarget);
    this.repositoryCache.set(manager, repository);
    return repository;
  }

  /**
   * @description Finds one non-deleted entity by UUID inside the current transaction.
   * @param id - Entity UUID.
   * @returns Entity or null when it does not exist or is soft-deleted.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-base.repository.findById at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async findById(id: string): Promise<TEntity | null> {
    const where = { id, deletedAt: IsNull() } as any;
    return this.repositoryFor().findOne({ where });
  }

  /**
   * @description Finds one non-deleted entity or fails immediately.
   * @param id - Entity UUID.
   * @returns Non-deleted entity.
   * @throws NotFoundException when the entity does not exist.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-base.repository.findByIdOrThrow at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async findByIdOrThrow(id: string): Promise<TEntity> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException({
        message: CORE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        error: 'RESOURCE_NOT_FOUND',
        errorCode: 'CORE.RESOURCE.NOT_FOUND',
      });
    }
    return entity;
  }
}
