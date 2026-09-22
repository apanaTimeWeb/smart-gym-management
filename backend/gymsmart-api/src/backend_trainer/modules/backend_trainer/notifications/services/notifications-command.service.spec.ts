// RESPONSIBILITY: Proves notification read-state mutation and fail-fast behavior.
// FLOW: Unit test → NotificationsCommandService → repository/audit fakes.

import { NotificationsCommandService } from '@/backend_trainer/modules/backend_trainer/notifications/services/notifications-command.service';

describe('NotificationsCommandService', () => {
  it('marks one notification read in trainer scope', async () => {
    const repo = { markRead: jest.fn().mockResolvedValue({ id: 'n1', isRead: true }) };
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const service = new NotificationsCommandService(repo as never, audit as never);
    await service.markRead('n1');
    expect(repo.markRead).toHaveBeenCalled();
    expect(audit.record).toHaveBeenCalledWith('NOTIFICATION_READ', 'NOTIFICATION', 'n1', null, { isRead: true });
  });

  it('fails closed when the notification is missing', async () => {
    const service = new NotificationsCommandService({ markRead: jest.fn().mockResolvedValue(null) } as never, { record: jest.fn() } as never);
    await expect(service.markRead('x')).rejects.toThrow('DOMAIN.NOTIFICATIONS.NOTIFICATION.NOT_FOUND');
  });
});
