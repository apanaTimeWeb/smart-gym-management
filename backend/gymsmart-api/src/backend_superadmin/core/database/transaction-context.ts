// RESPONSIBILITY: Provides request-local transaction context for TypeORM repositories without exposing ORM transactions to business services.
// FLOW: UnitOfWorkService -> AsyncLocalStorage -> BaseRepository -> transactional EntityManager.
import { AsyncLocalStorage } from 'node:async_hooks';
import type { EntityManager } from 'typeorm';

const transactionContextStorage = new AsyncLocalStorage<EntityManager>();

export class TransactionContext {
  /** Executes work inside a request-local database transaction context. */
  run<T>(manager: EntityManager, work: () => Promise<T>): Promise<T> {
    return transactionContextStorage.run(manager, work);
  }

  /** Returns the current transaction manager when a UnitOfWork is active. */
  getManager(): EntityManager | undefined {
    return transactionContextStorage.getStore();
  }
}
