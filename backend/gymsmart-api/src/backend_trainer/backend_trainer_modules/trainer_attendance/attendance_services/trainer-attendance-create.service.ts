// RESPONSIBILITY: Creates one attendance record for the authenticated Trainer.
// FLOW: TrainerAttendanceCommandController → TrainerAttendanceCreateService → TrainerAttendanceRepository.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreImmutableDomainEventService } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.service';
import { CORE_EVENT_REGISTRY } from '@/backend_trainer/backend_core/event-registry.constants';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerAttendanceRepository } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_repositories/trainer-attendance-repository';
import type { TrainerAttendanceCreateAttendanceDto } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_dtos/trainer-attendance-create-attendance.dto';
import { AttendanceRecordType, AttendanceCheckInMethod } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-enums';
import { AttendanceActorRequiredException, AttendanceMemberForbiddenException, AttendanceMemberRequiredException, AttendanceOpenStaffRecordExistsException, AttendanceOwnershipRequiredException, AttendanceTypeRequiredException } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-exceptions';
/**
 * Intent: Defines the TrainerAttendanceCreateService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerAttendanceCreateService {
  constructor(private readonly repo: TrainerAttendanceRepository, private readonly audit: CoreAuditService, private readonly events: CoreImmutableDomainEventService, private readonly uow: CoreUnitOfWorkService) {}
  /** Creates one member or trainer attendance record after validating ownership and required relationships. */
  /**
 * Intent: Executes the create operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes create inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for create.
 * @returns {Promise<Awaited<ReturnType<TrainerAttendanceRepository['createRecord']>> | null>} The typed result defined by the owning contract.
 * @throws AttendanceActorRequiredException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async create(input: TrainerAttendanceCreateAttendanceDto): Promise<Awaited<ReturnType<TrainerAttendanceRepository['createRecord']>> | null> {
    const actorId = CoreRequestContext.get().userId;
    if (!actorId) throw new AttendanceActorRequiredException();
    const type = this.resolveType(input);
    await this.validateActorScope(actorId, input, type);
    const row = await this.uow.execute(async (context) => {
      const created = await this.repo.createRecord(this.buildPersistence(input, actorId, type), context);
      await this.audit.record('ATTENDANCE_CREATED', 'ATTENDANCE', created.id, null, { type: created.type, memberId: created.memberId, staffId: created.staffId }, context);
      await this.events.record(CORE_EVENT_REGISTRY.ATTENDANCE_RECORD_CREATED, 'ATTENDANCE_RECORD', created.id, { type: created.type, date: created.date, memberId: created.memberId, staffId: created.staffId, checkIn: created.checkIn ?? null }, context);
      return created;
    });
    return input.isSelfCheckIn === true ? null : row;
  }
  /** Resolves self-check-in into the staff attendance type. */
  /**
 * Intent: Executes the resolveType operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes resolveType inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for resolveType.
 * @returns {AttendanceRecordType} The typed result defined by the owning contract.
 * @throws AttendanceTypeRequiredException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private resolveType(input: TrainerAttendanceCreateAttendanceDto): AttendanceRecordType {
    const type = input.isSelfCheckIn === true ? AttendanceRecordType.STAFF : input.type;
    if (!type) throw new AttendanceTypeRequiredException();
    return type;
  }
  /** Validates Trainer/member ownership and the single-open staff attendance invariant. */
  /**
 * Intent: Executes the validateActorScope operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes validateActorScope inside the owning backend service/repository boundary without exposing ORM details.
 * @param actorId - Input for validateActorScope.
 * @param input - Input for validateActorScope.
 * @param type - Input for validateActorScope.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws AttendanceMemberRequiredException, AttendanceMemberForbiddenException, AttendanceOwnershipRequiredException, AttendanceOpenStaffRecordExistsException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async validateActorScope(actorId: string, input: TrainerAttendanceCreateAttendanceDto, type: AttendanceRecordType): Promise<void> {
    if (type === AttendanceRecordType.MEMBER && !input.memberId) throw new AttendanceMemberRequiredException();
    if (type === AttendanceRecordType.MEMBER && !(await this.repo.memberBelongsToTrainer(actorId, input.memberId ?? ''))) throw new AttendanceMemberForbiddenException();
    if (type === AttendanceRecordType.STAFF && input.staffId && input.staffId !== actorId) throw new AttendanceOwnershipRequiredException();
    if (type === AttendanceRecordType.STAFF && !input.checkOut && await this.repo.findOpenByStaffId(actorId)) throw new AttendanceOpenStaffRecordExistsException();
  }
  /** Builds repository input from the validated attendance DTO. */
  /**
 * Intent: Executes the buildPersistence operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildPersistence inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for buildPersistence.
 * @param actorId - Input for buildPersistence.
 * @param type - Input for buildPersistence.
 * @returns {Parameters<TrainerAttendanceRepository['createRecord']>[0]} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildPersistence(input: TrainerAttendanceCreateAttendanceDto, actorId: string, type: AttendanceRecordType): Parameters<TrainerAttendanceRepository['createRecord']>[0] {
    const date = input.date ?? new Date().toISOString().slice(0, 10);
    const checkIn = this.toTimestamp(date, input.checkIn);
    const checkOut = input.checkOut ? this.toTimestamp(date, input.checkOut) : null;
    return {
      type, date: date.slice(0, 10), checkIn, checkOut, durationMinutes: this.duration(checkIn, checkOut),
      checkInMethod: input.isSelfCheckIn === true ? AttendanceCheckInMethod.SELF : input.checkInMethod ?? AttendanceCheckInMethod.MANUAL,
      notes: input.notes?.trim() || null,
      memberId: type === AttendanceRecordType.MEMBER ? input.memberId ?? null : null,
      staffId: type === AttendanceRecordType.STAFF ? actorId : null,
      createdBy: actorId,
    };
  }
  /** Converts the frontend date/time contract into a UTC database timestamp. */
  /**
 * Intent: Executes the toTimestamp operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toTimestamp inside the owning backend service/repository boundary without exposing ORM details.
 * @param date - Input for toTimestamp.
 * @param time - Input for toTimestamp.
 * @returns {Date} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toTimestamp(date: string, time?: string): Date {
    if (!time) return new Date();
    if (time.includes('T')) return new Date(time);
    return new Date(`${date.slice(0, 10)}T${time}:00.000Z`);
  }
  /** Returns the duration in minutes when both attendance timestamps are present. */
  /**
 * Intent: Executes the duration operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes duration inside the owning backend service/repository boundary without exposing ORM details.
 * @param start - Input for duration.
 * @param end - Input for duration.
 * @returns {number | null} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private duration(start: Date | null, end: Date | null): number | null {
    if (!start || !end) return null;
    return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
  }
}
