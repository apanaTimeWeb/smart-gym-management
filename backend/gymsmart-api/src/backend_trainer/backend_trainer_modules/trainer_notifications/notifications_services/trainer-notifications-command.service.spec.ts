// RESPONSIBILITY: Proves notification mutations use the UnitOfWork and repository-owned persistence boundary.
// FLOW: Jest → TrainerNotificationsCommandService → repository/UoW/audit fakes → observable mutation behavior.

import { TrainerNotificationsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-command.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';

describe('TrainerNotificationsCommandService', () => {
  it('records single notification read inside the active transaction', async () => {
    const repo = { markRead: jest.fn().mockResolvedValue({ id: 'n1' }) };
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const uow = { execute: jest.fn(async (callback: (context: unknown) => Promise<unknown>) => callback({})) };
    const service = new TrainerNotificationsCommandService(repo as never, audit as never, uow as never);
    const result = await CoreRequestContext.run({ userId: 'trainer-1', requestId: 'req-1' }, () => service.markRead('n1'));
    expect(result).toBeNull();
    expect(uow.execute).toHaveBeenCalledTimes(1);
    expect(audit.record).toHaveBeenCalledWith('NOTIFICATION_READ', 'NOTIFICATION', 'n1', null, { isRead: true }, expect.anything());
  });
});
