// RESPONSIBILITY: Encapsulates master-database transaction state for security-sensitive identity mutations.
// FLOW: Master UnitOfWork → CoreMasterTransactionContext → master repositories.

import type { EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';


/**
 * Intent: Defines the CoreMasterTransactionContext boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreMasterTransactionContext {
  constructor(private readonly manager: EntityManager) {}

  /** Returns a master-database repository bound to the active transaction. */
  getRepository<T extends ObjectLiteral>(target: EntityTarget<T>): Repository<T> {
    return this.manager.getRepository(target);
  }
}
