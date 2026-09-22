// RESPONSIBILITY: Provides framework-level repository helpers for active-row scoping and fail-fast typed existence checks.
// FLOW: Feature repository → CoreBaseRepository → TypeORM repository.

import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';

export abstract class CoreBaseRepository {
  /** Returns the supplied entity or raises the canonical typed not-found error. */
  protected requireEntity<T>(entity: T | null, resource: string, id: string): T {
    if (entity === null) {
      throw new CoreNotFoundException(resource, id);
    }
    return entity;
  }

  /** Indicates whether a mapped ORM entity is active under the soft-delete contract. */
  protected isActiveEntity(entity: { deletedAt?: Date | null }): boolean {
    return entity.deletedAt == null;
  }
}
