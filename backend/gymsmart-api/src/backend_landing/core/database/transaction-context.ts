// RESPONSIBILITY: Defines the transaction abstraction exposed to application services while keeping ORM objects inside repositories.
// FLOW: Orchestrator â†’ UnitOfWork â†’ TransactionContext abstraction â†’ repository persistence.
import type { EntityManager } from 'typeorm';

export interface TransactionContext {
  readonly manager: EntityManager;
}

export interface CoreUnitOfWork {
  runInTransaction<T>(work: (context: TransactionContext) => Promise<T>): Promise<T>;
}
