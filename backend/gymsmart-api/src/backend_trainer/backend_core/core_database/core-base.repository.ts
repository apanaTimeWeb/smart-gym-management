// RESPONSIBILITY: Provides framework-level repository helpers for active-row scoping and fail-fast typed existence checks.
// FLOW: Feature repository → CoreBaseRepository → TypeORM repository.

import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { IsNull } from 'typeorm';


/**
 * Intent: Defines the CoreBaseRepository boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export abstract class CoreBaseRepository {
  /** Returns the supplied entity or raises the canonical typed not-found error. */
  /**
 * @description Executes requireEntity inside the owning backend service/repository boundary without exposing ORM details.
 * @param entity - Input for requireEntity.
 * @param resource - Input for requireEntity.
 * @param id - Input for requireEntity.
 * @returns {T} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
protected requireEntity<T>(entity: T | null, resource: string, id: string): T {
    if (entity === null) {
      throw new CoreNotFoundException(resource, id);
    }
    return entity;
  }

  /** Returns the standard TypeORM soft-delete criterion used by feature repositories. */
  /**
 * @description Executes activeRowScope inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Partial<T>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
protected activeRowScope<T extends Record<string, unknown>>(): Partial<T> {
    return { deletedAt: IsNull() } as unknown as Partial<T>;
  }

  /** Indicates whether a mapped ORM entity is active under the soft-delete contract. */
  /**
 * @description Executes isActiveEntity inside the owning backend service/repository boundary without exposing ORM details.
 * @param entity - Input for isActiveEntity.
 * @returns {boolean} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
protected isActiveEntity(entity: { deletedAt?: Date | null }): boolean { return entity.deletedAt == null; }
}
