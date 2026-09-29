// RESPONSIBILITY: Proves attendance creation validates identity before entering persistence.
// FLOW: Jest → TrainerAttendanceCreateService → request context → validation guard.

import { TrainerAttendanceCreateService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-create.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';

describe('TrainerAttendanceCreateService', () => {
  it('rejects member attendance without a member ID', async () => {
    const service = new TrainerAttendanceCreateService(
      { createRecord: jest.fn(), memberBelongsToTrainer: jest.fn() } as never,
      { record: jest.fn() } as never,
      { execute: jest.fn() } as never,
      { execute: jest.fn() } as never,
    );
    await CoreRequestContext.run({ requestId: 'r', userId: 'u' }, async () => {
      await expect(service.create({ type: 'MEMBER', date: '2026-09-22' } as never)).rejects.toThrow('DOMAIN.ATTENDANCE.MEMBER_REQUIRED');
    });
  });
});
