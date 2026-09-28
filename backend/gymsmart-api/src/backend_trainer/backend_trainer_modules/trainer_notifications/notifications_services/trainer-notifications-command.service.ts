// RESPONSIBILITY: Applies Trainer notification read-state and preference mutations with atomic audit records.
// FLOW: Notifications command controller → command service → UnitOfWork → repository + audit.
import type { TrainerNotificationsPreferenceInput } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_types/trainer-notifications.types';
import { Injectable } from '@nestjs/common';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerNotificationsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_repositories/trainer-notifications-repository';
import { TrainerNotificationsUpdatePreferencesDto } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_dtos/trainer-notifications-update-preferences.dto';
/**
 * Intent: Defines the TrainerNotificationsCommandService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerNotificationsCommandService {
  constructor(
    private readonly repo: TrainerNotificationsRepository,
    private readonly audit: CoreAuditService,
    private readonly uow: CoreUnitOfWorkService,
  ) {}
  /** Marks one notification read and records the state change atomically. */
  /**
 * Intent: Executes the markRead operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes markRead inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for markRead.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async markRead(id: string): Promise<null> {
    const trainerId = this.getTrainerId();
    await this.uow.execute(async (context) => {
      const row = await this.repo.findByIdForTrainer(trainerId,id);
      if (!row) throw new CoreNotFoundException('NOTIFICATIONS.NOTIFICATION', id);
      const updated = await this.repo.markRead(id, trainerId, context);
      if (!updated) throw new CoreNotFoundException('NOTIFICATIONS.NOTIFICATION', id);
      await this.audit.record('NOTIFICATION_READ', 'NOTIFICATION', id, { isRead: row.isRead }, { isRead: updated.isRead }, context);
    });
    return null;
  }
  /** Marks all trainer notifications read and records the mutation atomically. */
  /**
 * Intent: Executes the markAllRead operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes markAllRead inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async markAllRead(): Promise<null> {
    const trainerId = this.getTrainerId();
    await this.uow.execute(async (context) => {
      const updated = await this.repo.markAllRead(trainerId, context);
      if (updated > 0) await this.audit.record('NOTIFICATIONS_MARKED_READ', 'NOTIFICATION', 'bulk', null, { updated }, context);
    });
    return null;
  }
  /** Persists validated notification preferences and records the mutation atomically. */
  /**
 * Intent: Executes the updatePreferences operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes updatePreferences inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for updatePreferences.
 * @returns {Promise<Record<string, boolean>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updatePreferences(dto: TrainerNotificationsUpdatePreferencesDto): Promise<Record<string, boolean>> {
    const trainerId = this.getTrainerId();
    const before = await this.repo.getPreferences(trainerId);
    if (!before) { return this.createPreferences(dto); }
    const row = await this.uow.execute(async (context) => {
      const updated = await this.repo.updatePreferences(trainerId, this.toPreferenceInput(dto), context);
      await this.audit.record('NOTIFICATION_PREFERENCES_UPDATED', 'NOTIFICATION_PREFERENCE', updated.id, { email: before.email, push: before.push, sms: before.sms, sessionReminders: before.sessionReminders, memberUpdates: before.memberUpdates }, { email: updated.email, push: updated.push, sms: updated.sms, sessionReminders: updated.sessionReminders, memberUpdates: updated.memberUpdates }, context);
      return updated;
    });
    return { email: row.email, push: row.push, sms: row.sms, sessionReminders: row.sessionReminders, memberUpdates: row.memberUpdates };
  }
  /** Creates preference state when the Trainer has no existing preference row. */
  /**
 * Intent: Executes the createPreferences operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes createPreferences inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for createPreferences.
 * @returns {Promise<Record<string, boolean>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async createPreferences(dto: TrainerNotificationsUpdatePreferencesDto): Promise<Record<string, boolean>> {
    const trainerId=this.getTrainerId();
    const row=await this.uow.execute(async(context)=>{const created=await this.repo.updatePreferences(trainerId,this.toPreferenceInput(dto),context); await this.audit.record('NOTIFICATION_PREFERENCES_CREATED','NOTIFICATION_PREFERENCE',created.id,null,{email:created.email,push:created.push,sms:created.sms,sessionReminders:created.sessionReminders,memberUpdates:created.memberUpdates},context); return created;});
    return {email:row.email,push:row.push,sms:row.sms,sessionReminders:row.sessionReminders,memberUpdates:row.memberUpdates};
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
  /** Maps preference DTO fields without exposing the HTTP DTO to persistence. */
  /**
 * Intent: Executes the toPreferenceInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toPreferenceInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for toPreferenceInput.
 * @returns {TrainerNotificationsPreferenceInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toPreferenceInput(dto: TrainerNotificationsUpdatePreferencesDto): TrainerNotificationsPreferenceInput {
    return {
      ...(dto.email !== undefined ? { email: dto.email } : {}),
      ...(dto.push !== undefined ? { push: dto.push } : {}),
      ...(dto.sms !== undefined ? { sms: dto.sms } : {}),
      ...(dto.sessionReminders !== undefined ? { sessionReminders: dto.sessionReminders } : {}),
      ...(dto.memberUpdates !== undefined ? { memberUpdates: dto.memberUpdates } : {}),
    };
  }
}
