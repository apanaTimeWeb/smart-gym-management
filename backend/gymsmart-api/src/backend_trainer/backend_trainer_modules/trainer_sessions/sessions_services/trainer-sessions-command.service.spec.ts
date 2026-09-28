// RESPONSIBILITY: Proves session command orchestration preserves repository ownership and audit boundaries.
// FLOW: Jest → TrainerSessionsCommandService → repository/UoW/audit fakes → observable mutation behavior.

import { TrainerSessionsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-command.service';

describe('TrainerSessionsCommandService', () => {
  it('wraps session creation and audit in the unit of work', async () => {
    const row = { id: 's1', type: 'PT', sessionDate: '2026-09-23', status: 'UPCOMING' };
    const repo = {
      memberBelongsToTrainer: jest.fn().mockResolvedValue(true),
      findMemberById: jest.fn().mockResolvedValue({ id: 'm1', name: 'Member' }),
      createSession: jest.fn().mockResolvedValue(row),
      findByIdOrThrow: jest.fn(),
    };
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const uow = { execute: jest.fn(async (callback: (context: unknown) => Promise<unknown>) => callback({})) };
    const original = await import('@/backend_trainer/backend_core/core_context/core-request-context');
    const result = await original.CoreRequestContext.run({ userId: 'trainer-1', requestId: 'req-1', tenantId: 'tenant-1' }, () =>
      new TrainerSessionsCommandService(repo as never, audit as never, uow as never).createSession({ memberId: 'm1', date: '2026-09-23', time: '10:00', duration: '60', type: 'PT', recurrenceType: 'none' } as never),
    );
    expect(result.id).toBe('s1');
    expect(uow.execute).toHaveBeenCalledTimes(1);
    expect(audit.record).toHaveBeenCalledWith('SESSION_CREATED', 'SESSION', 's1', null, expect.anything(), expect.anything());
  });
});
