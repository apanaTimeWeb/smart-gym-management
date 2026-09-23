// RESPONSIBILITY: Owns the repository access context for one active database transaction.
// FLOW: UnitOfWork transaction -> transaction context -> repository bound to the same EntityManager.
import { EntityManager, EntityTarget, Repository } from 'typeorm';

export class CoreTransactionContext {
  constructor(private readonly manager: EntityManager) {}

  /** @description Returns a repository bound to the active transaction. @param entity - Entity target. @returns Transaction-bound repository. */
  getRepository<T extends import("typeorm").ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    return this.manager.getRepository(entity);
  }
}
