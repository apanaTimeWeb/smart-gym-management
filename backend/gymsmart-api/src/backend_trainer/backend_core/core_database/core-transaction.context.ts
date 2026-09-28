// RESPONSIBILITY: Encapsulates a tenant ORM transaction manager behind the UnitOfWork abstraction.
// FLOW: Feature orchestrator → CoreUnitOfWorkService → CoreTransactionContext → repositories.

import type { EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';


/**
 * Intent: Defines the CoreTransactionContext boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTransactionContext {
  constructor(private readonly manager: EntityManager) {}

  /** Executes repository work using the active tenant transaction manager. */
  run<T>(callback: (manager: EntityManager) => Promise<T>): Promise<T> { return callback(this.manager); }

  /** Returns a repository bound to the active tenant transaction manager. */
  getRepository<T extends ObjectLiteral>(target: EntityTarget<T>): Repository<T> { return this.manager.getRepository(target); }
}
