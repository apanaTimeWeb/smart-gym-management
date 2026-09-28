// RESPONSIBILITY: Updates the authenticated Trainer profile through repository-owned persistence and atomic audit recording.
// FLOW: Profile command controller → update service → UnitOfWork → repository + audit → mapper.
import type { TrainerProfileProfileInput } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_types/trainer-profile.types';
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreSanitizationService } from '@/backend_trainer/backend_core/core_security/core-sanitization.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerProfileTrainerProfileRepository } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_repositories/trainer-profile-trainer-profile.repository';
import { TrainerProfileUpdateTrainerProfileDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-update-trainer-profile.dto';
/**
 * Intent: Defines the TrainerProfileTrainerProfileUpdateService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerProfileTrainerProfileUpdateService {
  constructor(
    private readonly repo: TrainerProfileTrainerProfileRepository,
    private readonly audit: CoreAuditService,
    private readonly sanitizer: CoreSanitizationService,
    private readonly uow: CoreUnitOfWorkService,
  ) {}
  /** Updates the authenticated Trainer profile and records the mutation atomically. */
  /**
 * Intent: Executes the update operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes update inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for update.
 * @returns {Promise<Awaited<ReturnType<TrainerProfileTrainerProfileRepository['findByUserId']>>>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async update(dto: TrainerProfileUpdateTrainerProfileDto): Promise<Awaited<ReturnType<TrainerProfileTrainerProfileRepository['findByUserId']>>> {
    const id = CoreRequestContext.getUserIdOrThrow();
    const before = await this.repo.findByUserId(id);
    if (!before) throw new CoreNotFoundException('PROFILE.TRAINER_PROFILE', id);
    const row = await this.uow.execute(async (context) => {
      const input=this.toInput(dto);
      const updated = await this.repo.updateByUserId(id, input, context);
      await this.audit.record('TRAINER_PROFILE_UPDATED', 'TRAINER_PROFILE', updated.id, { name: before.name, phone: before.phone, specialization: before.specialization }, { name: updated.name, phone: updated.phone, specialization: updated.specialization }, context);
      return updated;
    });
    return row;
  }
  /** Maps and sanitizes editable Trainer profile fields. */
  /**
 * Intent: Executes the toInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for toInput.
 * @returns {TrainerProfileProfileInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toInput(dto: TrainerProfileUpdateTrainerProfileDto): TrainerProfileProfileInput {
    return {
      name: this.sanitizer.text(dto.name) ?? '',
      phone: this.sanitizer.text(dto.phone) ?? '',
      specialization: dto.specialization.map((value) => this.sanitizer.text(value) ?? ''),
    };
  }
}
