// RESPONSIBILITY: Keeps the active TypeORM transaction manager inside infrastructure-only AsyncLocalStorage.
// FLOW: TypeORM transaction -> LandingOrmTransactionContextService -> repository adapter -> TypeORM Repository.
import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import type { EntityManager } from 'typeorm';

/**
 * Intent: Bind one active ORM manager to the current asynchronous execution so repositories can participate in the UnitOfWork without leaking ORM types upward.
 * Edge Cases: Repository access outside an active transaction is rejected instead of silently using a non-transactional manager.
 * Side Effects: Stores a TypeORM EntityManager only inside infrastructure-scoped AsyncLocalStorage.
 * AI Notes: This class is infrastructure-only; application services must depend on LandingCoreUnitOfWork, never on this adapter.
 */
@Injectable()
export class LandingOrmTransactionContextService {
  private readonly storage = new AsyncLocalStorage<EntityManager>();

  /**
   * @description Runs repository work with the supplied TypeORM manager bound to the current async context.
   * @param manager - Active TypeORM transaction manager.
   * @param work - Work to execute within this transaction scope.
   * @returns The work result.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-orm-transaction-context.service.run at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
run<T>(manager: EntityManager, work: () => Promise<T>): Promise<T> {
    return this.storage.run(manager, work);
  }

  /**
   * @description Resolves the active ORM manager for a repository adapter.
   * @returns The current transaction manager.
   * @throws Error when called outside a UnitOfWork transaction.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-orm-transaction-context.service.getManager at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
getManager(): EntityManager {
    const manager = this.storage.getStore();
    if (!manager) throw new Error('ORM_TRANSACTION_CONTEXT_UNAVAILABLE');
    return manager;
  }
}
