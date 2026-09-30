// RESPONSIBILITY: Owns master-database authentication user lookups for login and refresh flows.
// FLOW: Auth service → master user repository → TypeORM master repository → CoreUserEntity.

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CoreUserEntity } from '@/backend_trainer/backend_core/core_database/core-user.entity';


/**
 * Intent: Defines the CoreAuthUserRepository boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreAuthUserRepository {
  constructor(@InjectRepository(CoreUserEntity) private readonly repository: Repository<CoreUserEntity>) {}

  /** Finds an active master user by normalized email. */
  /**
 * @description Executes findActiveByEmail inside the owning backend service/repository boundary without exposing ORM details.
 * @param email - Input for findActiveByEmail.
 * @returns {Promise<CoreUserEntity | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findActiveByEmail(email: string): Promise<CoreUserEntity | null> {
    return this.repository.findOneBy({ email, isActive: true, deletedAt: IsNull() });
  }

  /** Finds an active master user by UUID. */
  /**
 * @description Executes findActiveById inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for findActiveById.
 * @returns {Promise<CoreUserEntity | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findActiveById(id: string): Promise<CoreUserEntity | null> {
    return this.repository.findOneBy({ id, isActive: true, deletedAt: IsNull() });
  }
}
