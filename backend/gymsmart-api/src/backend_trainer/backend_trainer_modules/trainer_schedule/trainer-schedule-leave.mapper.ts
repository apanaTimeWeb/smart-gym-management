// RESPONSIBILITY: Maps leave-request persistence to the exact Trainer frontend schedule contract.
// FLOW: TrainerScheduleLeaveRequestEntity → nullable-field normalization → ScheduleLeaveDomain.

import { TrainerScheduleEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enum.mapper';
import type { TrainerScheduleLeaveRequestEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave-request.entity';
import type { ScheduleLeaveDomain } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave.domain';

/**
 * Maps a persisted leave request into the frontend response shape.
 * @param entity Persisted leave request.
 * @returns Frontend-compatible leave response with optional nulls omitted.
 */
/**
 * @description Executes ScheduleLeaveMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for ScheduleLeaveMapper.
 * @returns {ScheduleLeaveDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function ScheduleLeaveMapper(entity: TrainerScheduleLeaveRequestEntity): ScheduleLeaveDomain {
  return {
    id: entity.id, trainerId: entity.trainerId, startDate: entity.startDate, endDate: entity.endDate, reason: entity.reason,
    leaveType: TrainerScheduleEnumMapper.toApiLeaveType(entity.leaveType), status: entity.status, createdAt: entity.createdAt.toISOString(),
    ...(entity.managerNotes !== null ? { managerNotes: entity.managerNotes } : {}),
    ...(entity.totalDays !== null ? { totalDays: entity.totalDays } : {}),
    ...(entity.attachmentUrl !== null ? { attachmentUrl: entity.attachmentUrl } : {}),
    ...(entity.approvedBy !== null ? { approvedBy: entity.approvedBy } : {}),
    ...(entity.rejectedReason !== null ? { rejectedReason: entity.rejectedReason } : {}),
  };
}
