// RESPONSIBILITY: Creates one Trainer leave request and records the mutation atomically.
// FLOW: TrainerScheduleCommandController → TrainerScheduleLeaveCreateService → UnitOfWork → repository + audit.
import type { TrainerScheduleLeavePersistenceInput } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_types/trainer-schedule.types';
import { Injectable } from '@nestjs/common';
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerScheduleRepository } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_repositories/trainer-schedule-repository';
import { TrainerScheduleCreateLeaveDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-create-leave.dto';
import type { ScheduleLeaveDomain } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave.domain';
import { LeaveStatus } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums';
import type { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
/**
 * Intent: Defines the TrainerScheduleLeaveCreateService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerScheduleLeaveCreateService {
  constructor(private readonly repo: TrainerScheduleRepository, private readonly audit: CoreAuditService, private readonly uow: CoreUnitOfWorkService) {}
  /** Creates a pending leave request only when the date range is valid. */
  /**
 * Intent: Executes the create operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes create inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for create.
 * @returns {Promise<ScheduleLeaveDomain>} The typed result defined by the owning contract.
 * @throws CoreDomainBadRequestException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async create(dto: TrainerScheduleCreateLeaveDto): Promise<ScheduleLeaveDomain> {
    if (dto.endDate < dto.startDate) throw new CoreDomainBadRequestException('SCHEDULE.LEAVE.INVALID_DATE_RANGE');
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const row = await this.uow.execute(async (context) => this.createAndAudit(trainerId, dto, context));
    return row;
  }
  /** Creates the leave row and audit record inside the active tenant transaction. */
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
 * @returns {Promise<Awaited<ReturnType<TrainerScheduleRepository['createLeave']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async createAndAudit(trainerId: string, dto: TrainerScheduleCreateLeaveDto, context: CoreTransactionContext): Promise<Awaited<ReturnType<TrainerScheduleRepository['createLeave']>>> {
    const row = await this.repo.createLeave(this.buildInput(trainerId, dto), context);
    await this.audit.record('LEAVE_REQUEST_CREATED', 'LEAVE_REQUEST', row.id, null, { startDate: row.startDate, endDate: row.endDate, leaveType: row.leaveType }, context);
    return row;
  }
  /** Builds repository input without exposing the HTTP DTO to persistence. */
  /**
 * Intent: Executes the buildInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes buildInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for buildInput.
 * @param dto - Input for buildInput.
 * @returns {TrainerScheduleLeavePersistenceInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildInput(trainerId: string, dto: TrainerScheduleCreateLeaveDto): TrainerScheduleLeavePersistenceInput {
    return { trainerId, startDate: dto.startDate, endDate: dto.endDate, reason: dto.reason, leaveType: dto.leaveType, status: LeaveStatus.PENDING, managerNotes: null, totalDays: Math.floor((Date.parse(dto.endDate) - Date.parse(dto.startDate)) / 86400000) + 1, attachmentUrl: null, approvedBy: null, rejectedReason: null };
  }
}
