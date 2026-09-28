// RESPONSIBILITY: Owns Trainer profile persistence and credential reads.
// FLOW: Profile service → repository → tenant TypeORM.

import type { ProfileMasterCredential } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_types/trainer-profile-master-credential.type';
// RESPONSIBILITY: Owns Trainer profile tenant persistence and master credential persistence for profile use cases.
// FLOW: Profile services → TrainerProfileTrainerProfileRepository → tenant trainer_profiles or master core_users.

import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { Injectable } from '@nestjs/common';
import type { ProfileTrainerProfileDomain } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.domain';
import { ProfileTrainerProfileMapper } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import type { CoreMasterTransactionContext } from '@/backend_trainer/backend_core/core_database/core-master-transaction.context';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreUserEntity } from '@/backend_trainer/backend_core/core_database/core-user.entity';
import { TrainerProfileTrainerProfileEntity } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.entity';



/**
 * Intent: Defines the TrainerProfileTrainerProfileRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerProfileTrainerProfileRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver, @InjectRepository(CoreUserEntity) private readonly users: Repository<CoreUserEntity>) {super();}

  /** Finds the tenant-scoped Trainer profile by authenticated master user ID. */
  /**
 * @description Executes findByUserId inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for findByUserId.
 * @returns {Promise<ProfileTrainerProfileDomain | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findByUserId(userId: string): Promise<ProfileTrainerProfileDomain | null> { return (await this.resolver.getRepository(TrainerProfileTrainerProfileEntity)).findOneBy({ userId, deletedAt: IsNull() }).then((row) => row ? ProfileTrainerProfileMapper(row) : null); }

  /** Updates only profile fields approved by the profile DTO. */
  /**
 * @description Executes updateByUserId inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for updateByUserId.
 * @param input - Input for updateByUserId.
 * @param context - Input for updateByUserId.
 * @returns {Promise<ProfileTrainerProfileDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateByUserId(userId: string, input: Pick<TrainerProfileTrainerProfileEntity, 'name' | 'phone' | 'specialization'>, context?: CoreTransactionContext): Promise<ProfileTrainerProfileDomain> { const repo = context?.getRepository(TrainerProfileTrainerProfileEntity) ?? await this.resolver.getRepository(TrainerProfileTrainerProfileEntity); await repo.update({ userId, deletedAt: IsNull() }, input); return repo.findOneByOrFail({ userId, deletedAt: IsNull() }).then(ProfileTrainerProfileMapper); }

  /** Reads only the master credential material required by the password use case. */
  /**
 * @description Executes findMasterCredentialByUserId inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for findMasterCredentialByUserId.
 * @returns {Promise<ProfileMasterCredential | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMasterCredentialByUserId(userId: string): Promise<ProfileMasterCredential | null> { const row = await this.users.findOne({ select: { id: true, passwordHash: true, isActive: true }, where: { id: userId, isActive: true } }); return row ? { userId: row.id, passwordHash: row.passwordHash } : null; }

  /** Updates the master password hash without exposing an ORM entity to the service layer. */
  /**
 * @description Executes updateMasterPasswordHash inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for updateMasterPasswordHash.
 * @param passwordHash - Input for updateMasterPasswordHash.
 * @param context - Input for updateMasterPasswordHash.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateMasterPasswordHash(userId: string, passwordHash: string, context?: CoreMasterTransactionContext): Promise<void> { const repo = context?.getRepository(CoreUserEntity) ?? this.users; await repo.update({ id: userId, isActive: true }, { passwordHash }); }
}
