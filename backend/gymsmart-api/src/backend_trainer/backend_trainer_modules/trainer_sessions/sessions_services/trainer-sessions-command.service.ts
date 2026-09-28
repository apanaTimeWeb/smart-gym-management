// RESPONSIBILITY: Executes isolated Trainer session mutations and records critical state changes atomically.
// FLOW: Sessions command controller → command service → ownership checks → UnitOfWork → repository + audit.
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerSessionsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_repositories/trainer-sessions-repository';
import { TrainerSessionsCreateSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-create-session.dto';
import { TrainerSessionsUpdateSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-update-session.dto';
import { TrainerSessionsCancelSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-cancel-session.dto';
import { TrainerSessionsMarkSessionAttendanceDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-mark-session-attendance.dto';
import { SessionRecurrence, SessionStatus } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';
import { TrainerSessionsExceptions } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-exceptions';
import type { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import type { TrainerSessionsSessionPersistenceInput } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_types/trainer-sessions-persistence.type';
/**
 * Intent: Defines the TrainerSessionsCommandService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerSessionsCommandService {
  constructor(
    private readonly repo: TrainerSessionsRepository,
    private readonly audit: CoreAuditService,
    private readonly uow: CoreUnitOfWorkService,
  ) {}
  /**
 * Intent: Executes the createSession operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes createSession inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for createSession.
 * @returns {Promise<Awaited<ReturnType<TrainerSessionsRepository['updateSessionById']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async createSession(dto: TrainerSessionsCreateSessionDto): Promise<Awaited<ReturnType<TrainerSessionsRepository['updateSessionById']>>> {
    const trainerId = this.getTrainerId();
    await this.assertMember(trainerId, dto.memberId);
    const row = await this.uow.execute(async (context) => this.createAndAudit(trainerId, dto, context));
    return row;
  }
  /**
 * Intent: Executes the updateSession operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes updateSession inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for updateSession.
 * @param dto - Input for updateSession.
 * @returns {Promise<Awaited<ReturnType<TrainerSessionsRepository['createSession']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateSession(id: string, dto: TrainerSessionsUpdateSessionDto): Promise<Awaited<ReturnType<TrainerSessionsRepository['createSession']>>> {
    const trainerId = this.getTrainerId();
    await this.assertMember(trainerId, dto.memberId);
    const before = await this.repo.findByIdOrThrow(trainerId, id);
    const row = await this.uow.execute(async (context) => {
      const updated = await this.repo.updateSessionById(
        id,
        trainerId,
        { time: dto.time, sessionDate: dto.date, duration: dto.duration, type: dto.type, ...(dto.memberId !== undefined ? { memberId: dto.memberId, enrolledMembers: dto.memberId === null ? [] : await this.resolveEnrolledMembers(trainerId, dto.memberId) } : {}), location: dto.location, room: dto.room, recurrenceRule: dto.recurrenceType, recurrenceEndDate: dto.recurrenceEndDate ?? null },
        context,
      );
      const oldValue={time:before.time,sessionDate:before.sessionDate,duration:before.duration,type:before.type,status:before.status,memberId:before.memberId,location:before.location,room:before.room,recurrenceRule:before.recurrenceRule,recurrenceEndDate:before.recurrenceEndDate};
      const newValue={time:updated.time,sessionDate:updated.sessionDate,duration:updated.duration,type:updated.type,status:updated.status,memberId:updated.memberId,location:updated.location,room:updated.room,recurrenceRule:updated.recurrenceRule,recurrenceEndDate:updated.recurrenceEndDate};
      await this.audit.record('SESSION_UPDATED', 'SESSION', id, oldValue, newValue, context);
      return updated;
    });
    return row;
  }
  /**
 * Intent: Executes the cancelSession operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes cancelSession inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for cancelSession.
 * @param dto - Input for cancelSession.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async cancelSession(id: string, dto: TrainerSessionsCancelSessionDto): Promise<null> {
    const trainerId = this.getTrainerId();
    const before = await this.repo.findByIdOrThrow(trainerId, id);
    const row = await this.uow.execute(async (context) => {
      const updated = await this.repo.cancelSession(id, trainerId, dto.reason?.trim() || 'Trainer cancelled session', context);
      await this.audit.record('SESSION_CANCELLED', 'SESSION', id, { status: before.status, cancellationReason: before.cancellationReason }, { status: updated.status, cancellationReason: updated.cancellationReason }, context);
      return updated;
    });
    return null;
  }
  /**
 * Intent: Executes the markAttendance operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes markAttendance inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for markAttendance.
 * @param dto - Input for markAttendance.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async markAttendance(id: string, dto: TrainerSessionsMarkSessionAttendanceDto): Promise<null> {
    const trainerId = this.getTrainerId();
    await this.uow.execute(async (context) => {
      await this.repo.markMemberAttendance(id, trainerId, dto.memberIds, context);
      await this.audit.record('SESSION_ATTENDANCE_RECORDED', 'SESSION', id, null, { memberCount: dto.memberIds.length }, context);
    });
    return null;
  }
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
  /**
 * Intent: Executes the assertMember operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes assertMember inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for assertMember.
 * @param memberId - Input for assertMember.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws TrainerSessionsExceptions when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async assertMember(trainerId: string, memberId?: string): Promise<void> {
    if (memberId && !(await this.repo.memberBelongsToTrainer(trainerId, memberId))) throw new TrainerSessionsExceptions();
  }
  /**
 * Intent: Executes the resolveEnrolledMembers operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes resolveEnrolledMembers inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for resolveEnrolledMembers.
 * @param memberId - Input for resolveEnrolledMembers.
 * @returns {Promise<Array<{ id: string; name: string }>>} The typed result defined by the owning contract.
 * @throws TrainerSessionsExceptions when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async resolveEnrolledMembers(trainerId: string, memberId: string): Promise<Array<{ id: string; name: string }>> {
    const member = await this.repo.findMemberById(trainerId, memberId);
    if (!member) throw new TrainerSessionsExceptions();
    return [member];
  }
  /**
 * Intent: Executes the createAndAudit operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes createAndAudit inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for createAndAudit.
 * @param dto - Input for createAndAudit.
 * @param context - Input for createAndAudit.
 * @returns {Promise<Awaited<ReturnType<TrainerSessionsRepository['createSession']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async createAndAudit(trainerId: string, dto: TrainerSessionsCreateSessionDto, context: CoreTransactionContext): Promise<Awaited<ReturnType<TrainerSessionsRepository['createSession']>>> {
    const enrolledMember = dto.memberId ? await this.repo.findMemberById(trainerId, dto.memberId) : null;
    const row = await this.repo.createSession(this.buildCreateInput(trainerId, dto, enrolledMember), context);
    await this.audit.record('SESSION_CREATED', 'SESSION', row.id, null, { type: row.type, date: row.sessionDate }, context);
    return row;
  }
  /**
 * Intent: Executes the buildCreateInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildCreateInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for buildCreateInput.
 * @param dto - Input for buildCreateInput.
 * @param enrolledMember - Input for buildCreateInput.
 * @returns {TrainerSessionsSessionPersistenceInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildCreateInput(trainerId: string, dto: TrainerSessionsCreateSessionDto, enrolledMember: { id: string; name: string } | null): TrainerSessionsSessionPersistenceInput {
    return {
      trainerId, title: dto.type === 'PT' ? 'Personal Training' : 'Group Session', type: dto.type,
      time: dto.time, sessionDate: dto.date, duration: dto.duration, status: SessionStatus.UPCOMING,
      attendees: 0, maxAttendees: null, memberId: dto.memberId ?? null, isOnline: false,
      enrolledMembers: enrolledMember ? [enrolledMember] : [], sessionNotes: null, location: dto.location ?? null,
      room: dto.room ?? null, trainerNotes: null, memberRating: null, cancellationReason: null,
      recurrenceRule: dto.recurrenceType ?? SessionRecurrence.NONE, recurrenceEndDate: dto.recurrenceEndDate ?? null,
    };
  }
}
