// RESPONSIBILITY: Provides request-local transaction context for TypeORM repositories without exposing ORM transactions to business services.
// FLOW: SuperadminCoreUnitOfWorkService -> AsyncLocalStorage -> BaseRepository -> transactional EntityManager.
import { AsyncLocalStorage } from 'node:async_hooks';
import type { EntityManager } from 'typeorm';

const transactionContextStorage = new AsyncLocalStorage<EntityManager>();

/**
 * Primary Intent: Defines SuperadminCoreTransactionContext as the class-level contract for superadmin-core-transaction-context.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminCoreTransactionContext {
  /**
 * Primary Intent: Executes the run use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  run<T>(manager: EntityManager, work: () => Promise<T>): Promise<T> {
    return transactionContextStorage.run(manager, work);
  }

  /**
 * Primary Intent: Executes the getManager use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  getManager(): EntityManager | undefined {
    return transactionContextStorage.getStore();
  }
}
