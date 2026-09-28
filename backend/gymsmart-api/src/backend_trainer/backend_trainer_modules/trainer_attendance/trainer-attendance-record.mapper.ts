// RESPONSIBILITY: Maps attendance ORM state to the frontend-required response shape without leaking persistence nulls.
// FLOW: TrainerAttendanceRecordEntity → nullable-field normalization → AttendanceRecordDomain.

import type { AttendanceRecordDomain } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.domain';
import type { TrainerAttendanceRecordEntity } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.entity';

interface AttendanceRelatedPersonInput {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
}

/**
 * @description Executes mapPerson as an isolated backend utility/adapter operation.
 * @param person - Input for mapPerson.
 * @returns {{ id: string; name: string; phone?: string; email?: string } | undefined} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
function mapPerson(person?: AttendanceRelatedPersonInput | null): { id: string; name: string; phone?: string; email?: string } | undefined {
  if (!person) return undefined;
  return {
    id: person.id,
    name: person.name,
    ...(person.phone !== null && person.phone !== undefined ? { phone: person.phone } : {}),
    ...(person.email !== null && person.email !== undefined ? { email: person.email } : {}),
  };
}

/**
 * Maps a persisted attendance row into the current Trainer frontend contract.
 * @param entity Persisted attendance row with optional related member/staff data.
 * @returns Attendance response data with optional fields omitted when null.
 * @remarks The frontend Zod contract uses optional fields, not nullable fields.
 */
/**
 * @description Executes AttendanceRecordMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for AttendanceRecordMapper.
 * @returns {AttendanceRecordDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function AttendanceRecordMapper(entity: TrainerAttendanceRecordEntity): AttendanceRecordDomain {
  return {
    id: entity.id,
    type: entity.type,
    date: entity.date,
    ...(entity.checkIn ? { checkIn: entity.checkIn.toISOString() } : {}),
    ...(entity.checkOut ? { checkOut: entity.checkOut.toISOString() } : {}),
    ...(entity.durationMinutes !== null ? { durationMinutes: entity.durationMinutes } : {}),
    ...(entity.checkInMethod !== null ? { checkInMethod: entity.checkInMethod } : {}),
    ...(entity.notes !== null ? { notes: entity.notes } : {}),
    ...(entity.memberId !== null ? { memberId: entity.memberId } : {}),
    ...(entity.staffId !== null ? { staffId: entity.staffId } : {}),
    ...(mapPerson(entity.member) ? { member: mapPerson(entity.member) } : {}),
    ...(mapPerson(entity.staff) ? { staff: mapPerson(entity.staff) } : {}),
  };
}
