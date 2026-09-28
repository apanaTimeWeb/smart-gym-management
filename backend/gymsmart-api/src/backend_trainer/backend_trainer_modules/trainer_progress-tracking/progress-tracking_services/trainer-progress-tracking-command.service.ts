// RESPONSIBILITY: Creates, updates, and soft-deletes member progress entries with atomic audit records.
// FLOW: Progress command controller → command service → UnitOfWork → repository + audit → mapper.
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { TrainerProgressTrackingRepository } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_repositories/trainer-progress-tracking-repository';
import { TrainerProgressTrackingCreateProgressEntryDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-create-progress-entry.dto';
import { TrainerProgressTrackingUpdateProgressEntryDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-update-progress-entry.dto';
import type { ProgressTrackingProgressEntryUpdateInput } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_types/trainer-progress-tracking.types';
/**
 * Intent: Defines the TrainerProgressTrackingCommandService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerProgressTrackingCommandService {
  constructor(
    private readonly repo: TrainerProgressTrackingRepository,
    private readonly audit: CoreAuditService,
    private readonly uow: CoreUnitOfWorkService,
  ) {}
  /** Creates a progress entry and records the mutation atomically. */
  /**
 * Intent: Executes the create operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes create inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for create.
 * @param dto - Input for create.
 * @returns {Promise<Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async create(memberId: string, dto: TrainerProgressTrackingCreateProgressEntryDto): Promise<Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>> {
    const trainerId = this.getTrainerId();
    await this.repo.assertMemberOwnedByTrainer(trainerId, memberId);
    const bmi = this.calculateBmi(dto.weightKg, dto.heightCm);
    const row = await this.uow.execute(async (context) => {
      const created = await this.repo.createProgressEntry(memberId, { ...dto, bmi, recordedBy: trainerId }, context);
      await this.audit.record('PROGRESS_ENTRY_CREATED', 'PROGRESS_ENTRY', created.id, null, { memberId }, context);
      return created;
    });
    return row;
  }
  /** Updates a progress entry in member scope and records the mutation atomically. */
  /**
 * Intent: Executes the update operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes update inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for update.
 * @param id - Input for update.
 * @param dto - Input for update.
 * @returns {Promise<Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async update(memberId: string, id: string, dto: TrainerProgressTrackingUpdateProgressEntryDto): Promise<Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>> {
    const trainerId = this.getTrainerId();
    await this.repo.assertMemberOwnedByTrainer(trainerId, memberId);
    const before = await this.repo.findByIdOrThrow(memberId, id);
    const row = await this.uow.execute(async (context) => {
      const input = this.buildUpdateInput(before, dto);
      const updated = await this.repo.updateProgressEntryById(id, memberId, input, context);
      const fields=Object.keys(input) as Array<keyof typeof input>;
      const oldValue=Object.fromEntries(fields.map((field)=>[field,before[field as keyof typeof before]]));
      const newValue=Object.fromEntries(fields.map((field)=>[field,updated[field as keyof typeof updated]]));
      await this.audit.record('PROGRESS_ENTRY_UPDATED', 'PROGRESS_ENTRY', id, oldValue, newValue, context);
      return updated;
    });
    return row;
  }
  /** Soft-deletes an entry in member scope and records the mutation atomically. */
  /**
 * Intent: Executes the delete operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes delete inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for delete.
 * @param id - Input for delete.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async delete(memberId: string, id: string): Promise<null> {
    await this.repo.findByIdOrThrow(memberId, id);
    await this.uow.execute(async (context) => {
      await this.repo.softDelete(id, memberId, context);
      await this.audit.record('PROGRESS_ENTRY_DELETED', 'PROGRESS_ENTRY', id, null, { deleted: true }, context);
    });
    return null;
  }
  /** Returns the authenticated Trainer identifier. */
  /**
 * Intent: Executes the getTrainerId operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getTrainerId inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private getTrainerId(): string {
    return CoreRequestContext.getUserIdOrThrow();
  }
  /** Calculates BMI using the domain measurement units. */
  /**
 * Intent: Executes the calculateBmi operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes calculateBmi inside the owning backend service/repository boundary without exposing ORM details.
 * @param weightKg - Input for calculateBmi.
 * @param heightCm - Input for calculateBmi.
 * @returns {number} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private calculateBmi(weightKg: number, heightCm: number): number {
    return Number((weightKg / ((heightCm / 100) ** 2)).toFixed(2));
  }
  /** Builds the update input and recalculates BMI from effective measurements. */
  /**
 * Intent: Executes the buildUpdateInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildUpdateInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param before - Input for buildUpdateInput.
 * @param dto - Input for buildUpdateInput.
 * @returns {ProgressTrackingProgressEntryUpdateInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildUpdateInput(before: Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>, dto: TrainerProgressTrackingUpdateProgressEntryDto): ProgressTrackingProgressEntryUpdateInput {
    const weight = dto.weightKg ?? Number(before.weightKg);
    const height = dto.heightCm ?? Number(before.heightCm);
    const bmi = weight > 0 && height > 0 ? this.calculateBmi(weight, height) : Number(before.bmi);
    return { ...dto, bmi };
  }
}
