// RESPONSIBILITY: Proves nullable attendance persistence values are normalized to frontend optional fields.
// FLOW: Jest → AttendanceRecordMapper → null persistence values → omitted optional response properties.

import type { TrainerAttendanceRecordEntity } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.entity';
import { AttendanceRecordMapper } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.mapper';
import { AttendanceRecordType } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-enums';

describe('AttendanceRecordMapper', () => {
  it('omits nullable fields when persistence values are null', () => {
    const entity = {
      id: 'attendance-1',
      type: AttendanceRecordType.MEMBER,
      date: '2026-09-24',
      checkIn: null,
      checkOut: null,
      durationMinutes: null,
      checkInMethod: null,
      notes: null,
      memberId: null,
      staffId: null,
      member: null,
      staff: null,
    } as TrainerAttendanceRecordEntity;

    expect(AttendanceRecordMapper(entity)).toEqual({
      id: 'attendance-1',
      type: AttendanceRecordType.MEMBER,
      date: '2026-09-24',
    });
  });

  it('preserves timestamps and related person fields when populated', () => {
    const entity = {
      id: 'attendance-2',
      type: AttendanceRecordType.MEMBER,
      date: '2026-09-24',
      checkIn: new Date('2026-09-24T08:00:00.000Z'),
      checkOut: new Date('2026-09-24T09:00:00.000Z'),
      durationMinutes: 60,
      checkInMethod: 'MANUAL',
      notes: 'Morning session',
      memberId: 'member-1',
      staffId: null,
      member: { id: 'member-1', name: 'Rahul', phone: null, email: 'rahul@example.com' },
      staff: null,
    } as TrainerAttendanceRecordEntity;

    expect(AttendanceRecordMapper(entity)).toEqual({
      id: 'attendance-2',
      type: AttendanceRecordType.MEMBER,
      date: '2026-09-24',
      checkIn: '2026-09-24T08:00:00.000Z',
      checkOut: '2026-09-24T09:00:00.000Z',
      durationMinutes: 60,
      checkInMethod: 'MANUAL',
      notes: 'Morning session',
      memberId: 'member-1',
      member: { id: 'member-1', name: 'Rahul', email: 'rahul@example.com' },
    });
  });
});
