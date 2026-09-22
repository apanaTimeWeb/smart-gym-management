// RESPONSIBILITY: Maps attendance ORM state to the frontend-required domain response shape.
// FLOW: AttendanceRecordEntity → AttendanceRecordMapper → canonical response data.

import type { AttendanceRecordDomain } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-record.domain';
import type { AttendanceRecordEntity } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-record.entity';

export function AttendanceRecordMapper(entity: AttendanceRecordEntity): AttendanceRecordDomain {
  return {
    id: entity.id, type: entity.type, date: entity.date,
    checkIn: entity.checkIn?.toISOString() ?? null, checkOut: entity.checkOut?.toISOString() ?? null,
    durationMinutes: entity.durationMinutes, checkInMethod: entity.checkInMethod ?? null, notes: entity.notes ?? null,
    memberId: entity.memberId ?? null, staffId: entity.staffId ?? null, member: entity.member ?? null, staff: entity.staff ?? null,
  };
}
