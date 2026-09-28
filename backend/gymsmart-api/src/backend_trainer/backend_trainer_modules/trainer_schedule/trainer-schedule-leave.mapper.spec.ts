// RESPONSIBILITY: Proves schedule leave nullable persistence values are normalized to frontend optional fields.
// FLOW: Jest → ScheduleLeaveMapper → null leave metadata → omitted optional response properties.

import type { TrainerScheduleLeaveRequestEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave-request.entity';
import { ScheduleLeaveMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave.mapper';
import { LeaveStatus, LeaveType } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums';

describe('ScheduleLeaveMapper', () => {
  it('omits nullable approval and attachment fields', () => {
    const entity = {
      id: 'leave-1', trainerId: 'trainer-1', startDate: '2026-09-25', endDate: '2026-09-26', reason: 'Personal work', leaveType: LeaveType.CASUAL_LEAVE, status: LeaveStatus.PENDING,
      managerNotes: null, totalDays: 2, attachmentUrl: null, approvedBy: null, rejectedReason: null, createdAt: new Date('2026-09-24T00:00:00.000Z'), updatedAt: new Date('2026-09-24T00:00:00.000Z'),
    } as TrainerScheduleLeaveRequestEntity;

    expect(ScheduleLeaveMapper(entity)).toEqual({
      id: 'leave-1', trainerId: 'trainer-1', startDate: '2026-09-25', endDate: '2026-09-26', reason: 'Personal work', leaveType: 'CASUAL', status: LeaveStatus.PENDING, totalDays: 2, createdAt: '2026-09-24T00:00:00.000Z',
    });
  });
});
