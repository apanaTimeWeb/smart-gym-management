// RESPONSIBILITY: Creates one attendance record for the authenticated Trainer.
// FLOW: AttendanceCommandController → AttendanceCreateService → AttendanceRepository.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { AttendanceRepository } from '@/backend_trainer/modules/backend_trainer/attendance/repositories/attendance-repository';
import type { AttendanceCreateAttendanceDto } from '@/backend_trainer/modules/backend_trainer/attendance/dtos/attendance-create-attendance.dto';
import { AttendanceRecordType, AttendanceCheckInMethod } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-enums'; import { AttendanceRecordMapper } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-record.mapper';
import { AttendanceActorRequiredException, AttendanceMemberForbiddenException, AttendanceMemberRequiredException, AttendanceOpenStaffRecordExistsException, AttendanceOwnershipRequiredException, AttendanceTypeRequiredException } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-exceptions';

@Injectable()
export class AttendanceCreateService {
  constructor(private readonly repo: AttendanceRepository, private readonly audit: CoreAuditService) {}

  /** Creates one member or trainer attendance record after validating ownership and required relationships. */
  async create(input: AttendanceCreateAttendanceDto): Promise<ReturnType<typeof AttendanceRecordMapper> | null> {
    const actorId = CoreRequestContext.get().userId;
    if (!actorId) throw new AttendanceActorRequiredException();
    const isSelf = input.isSelfCheckIn === true;
    const type = isSelf ? AttendanceRecordType.STAFF : input.type;
    if (!type) throw new AttendanceTypeRequiredException();
    if (type === AttendanceRecordType.MEMBER && !input.memberId) throw new AttendanceMemberRequiredException();
    if (type === AttendanceRecordType.MEMBER && !(await this.repo.memberBelongsToTrainer(actorId, input.memberId ?? ''))) throw new AttendanceMemberForbiddenException();
    if (type === AttendanceRecordType.STAFF && input.staffId && input.staffId !== actorId) throw new AttendanceOwnershipRequiredException();
    if (type === AttendanceRecordType.STAFF && !input.checkOut && await this.repo.findOpenByStaffId(actorId)) throw new AttendanceOpenStaffRecordExistsException();
    const date = input.date ?? new Date().toISOString().slice(0, 10);
    const checkIn = this.toTimestamp(date, input.checkIn);
    const checkOut = input.checkOut ? this.toTimestamp(date, input.checkOut) : null;
    const row = await this.repo.createRecord({
      type, date: date.slice(0, 10), checkIn, checkOut, durationMinutes: this.duration(checkIn, checkOut),
      checkInMethod: (isSelf ? AttendanceCheckInMethod.SELF : input.checkInMethod ?? AttendanceCheckInMethod.MANUAL),
      notes: input.notes?.trim() || null, memberId: type === AttendanceRecordType.MEMBER ? input.memberId ?? null : null,
      staffId: type === AttendanceRecordType.STAFF ? actorId : null, createdBy: actorId,
    });
    await this.audit.record('ATTENDANCE_CREATED', 'ATTENDANCE', row.id, null, { type: row.type, memberId: row.memberId, staffId: row.staffId });
    return isSelf ? null : AttendanceRecordMapper(row);
  }

  /** Converts the frontend date/time contract into a UTC database timestamp. */
  private toTimestamp(date: string, time?: string): Date {
    if (!time) return new Date();
    if (time.includes('T')) return new Date(time);
    return new Date(`${date.slice(0, 10)}T${time}:00.000Z`);
  }

  /** Returns the duration in minutes when both attendance timestamps are present. */
  private duration(start: Date | null, end: Date | null): number | null {
    if (!start || !end) return null;
    return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
  }
}
