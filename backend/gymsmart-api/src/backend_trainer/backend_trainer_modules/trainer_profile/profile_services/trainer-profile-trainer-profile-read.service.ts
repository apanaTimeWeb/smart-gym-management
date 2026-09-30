// RESPONSIBILITY: Reads the authenticated trainer profile through its feature-local repository.
// FLOW: Profile controller → read service → profile repository.
import { Injectable } from '@nestjs/common'; import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context'; import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception'; import { TrainerProfileTrainerProfileRepository } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_repositories/trainer-profile-trainer-profile.repository';
 /**
 * Intent: Defines the TrainerProfileTrainerProfileReadService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerProfileTrainerProfileReadService { constructor(private readonly repo:TrainerProfileTrainerProfileRepository){}
 /** Returns the authenticated trainer profile. */ /**
 * Intent: Executes the find operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes find inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<Awaited<ReturnType<TrainerProfileTrainerProfileRepository['findByUserId']>>>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async find():Promise<Awaited<ReturnType<TrainerProfileTrainerProfileRepository['findByUserId']>>>{const row=await this.repo.findByUserId(CoreRequestContext.getUserIdOrThrow()); if (!row) throw new CoreNotFoundException('PROFILE.TRAINER_PROFILE', CoreRequestContext.getUserIdOrThrow()); return row;} }
