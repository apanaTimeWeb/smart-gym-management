// RESPONSIBILITY: Updates one trainer-owned member through repository-owned persistence and atomic audit recording.
// FLOW: Members command controller → update service → UnitOfWork → repository + audit → mapper.
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreSanitizationService } from '@/backend_trainer/backend_core/core_security/core-sanitization.service';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';
import { TrainerMembersUpdateMemberDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-update-member.dto';
import type { MembersMemberDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.domain';
import type { MembersUpdateInput } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_types/trainer-members.types';
/**
 * Intent: Defines the TrainerMembersUpdateService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerMembersUpdateService {
  constructor(
    private readonly repo: TrainerMembersRepository,
    private readonly audit: CoreAuditService,
    private readonly sanitizer: CoreSanitizationService,
    private readonly uow: CoreUnitOfWorkService,
  ) {}
  /** Updates a trainer-owned member and records the state change inside one transaction. */
  /**
 * Intent: Executes the update operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes update inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for update.
 * @param dto - Input for update.
 * @returns {Promise<MembersMemberDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async update(id: string, dto: TrainerMembersUpdateMemberDto): Promise<MembersMemberDomain> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const before = await this.repo.findByIdForTrainerOrThrow(trainerId, id);
    const input = this.buildUpdateInput(dto);
    const row = await this.uow.execute(async (context) => {
      const updated = await this.repo.updateMemberById(trainerId, id, input, context);
      const changedFields = Object.keys(input) as Array<keyof typeof input>;
      const oldValue = Object.fromEntries(changedFields.map((field) => [field, before[field as keyof typeof before]]));
      const newValue = Object.fromEntries(changedFields.map((field) => [field, updated[field as keyof typeof updated]]));
      await this.audit.record('MEMBER_UPDATED', 'MEMBER', id, oldValue, newValue, context);
      return updated;
    });
    return row;
  }
  /** Converts the HTTP DTO into a repository-owned application input. */
  /**
 * Intent: Executes the buildUpdateInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildUpdateInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for buildUpdateInput.
 * @returns {MembersUpdateInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildUpdateInput(dto: TrainerMembersUpdateMemberDto): MembersUpdateInput {
    return { ...this.buildIdentityFields(dto), ...this.buildMembershipFields(dto), ...this.buildFitnessFields(dto) };
  }
  /** Builds identity/contact changes. */
  /**
 * Intent: Executes the buildIdentityFields operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildIdentityFields inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for buildIdentityFields.
 * @returns {MembersUpdateInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildIdentityFields(dto: TrainerMembersUpdateMemberDto): MembersUpdateInput {
    return {
      ...(dto.name !== undefined ? { name: this.sanitizer.text(dto.name) ?? '' } : {}),
      ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
      ...(dto.email !== undefined ? { email: dto.email } : {}),
      ...(dto.address !== undefined ? { address: this.sanitizer.text(dto.address) } : {}),
      ...(dto.age !== undefined ? { age: dto.age } : {}),
    };
  }
  /** Builds membership and relationship IDs; no client snapshots are accepted. */
  /**
 * Intent: Executes the buildMembershipFields operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildMembershipFields inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for buildMembershipFields.
 * @returns {MembersUpdateInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildMembershipFields(dto: TrainerMembersUpdateMemberDto): MembersUpdateInput {
    return {
      ...(dto.planId !== undefined ? { planId: dto.planId } : {}),
      ...(dto.planName !== undefined ? { planName: dto.planName } : {}),
      ...(dto.planTier !== undefined ? { planTier: dto.planTier } : {}),
      ...(dto.billingCycle !== undefined ? { billingCycle: dto.billingCycle } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.joinDate !== undefined ? { joinDate: dto.joinDate } : {}),
      ...(dto.expiryDate !== undefined ? { expiryDate: dto.expiryDate } : {}),
      ...(dto.assignedDietId !== undefined ? { assignedDietId: dto.assignedDietId } : {}),
      ...(dto.assignedWorkoutId !== undefined ? { assignedWorkoutId: dto.assignedWorkoutId } : {}),
      ...(dto.membershipNumber !== undefined ? { membershipNumber: dto.membershipNumber } : {}),
    };
  }
  /** Builds fitness and assessment changes while sanitizing free-text fields. */
  /**
 * Intent: Executes the buildFitnessFields operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildFitnessFields inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for buildFitnessFields.
 * @returns {MembersUpdateInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildFitnessFields(dto: TrainerMembersUpdateMemberDto): MembersUpdateInput {
    return {
      ...(dto.fitnessLevel !== undefined ? { fitnessLevel: dto.fitnessLevel } : {}),
      ...(dto.targetWeightKg !== undefined ? { targetWeightKg: dto.targetWeightKg } : {}),
      ...(dto.fitnessGoal !== undefined ? { fitnessGoal: dto.fitnessGoal } : {}),
      ...(dto.progressStatus !== undefined ? { progressStatus: dto.progressStatus } : {}),
      ...(dto.weightKg !== undefined ? { weightKg: dto.weightKg } : {}),
      ...(dto.heightCm !== undefined ? { heightCm: dto.heightCm } : {}),
      ...(dto.bmi !== undefined ? { bmi: dto.bmi } : {}),
      ...(dto.isPT !== undefined ? { isPT: dto.isPT } : {}),
      ...(dto.medicalRestrictions !== undefined ? { medicalRestrictions: this.sanitizer.text(dto.medicalRestrictions) } : {}),
      ...(dto.daysSinceLastCheckIn !== undefined ? { daysSinceLastCheckIn: dto.daysSinceLastCheckIn } : {}),
      ...(dto.assessment !== undefined ? { assessment: dto.assessment } : {}),
    };
  }
}
