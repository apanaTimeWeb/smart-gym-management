// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { NotificationsMarkNotificationReadService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mark-notification-read.service';

describe('NotificationsMarkNotificationReadService', () => {
  it('writes the READ status/readAt mutation and returns null', async () => {
    const dependency = { updateNotification: jest.fn().mockResolvedValue({ id: 'n1' }) };
    const service = new NotificationsMarkNotificationReadService(dependency as never);
    const result = await service.updateNotificationRead('n1');
    expect(result).toBeNull();
    expect(dependency.updateNotification).toHaveBeenCalledTimes(1);
    expect(dependency.updateNotification).toHaveBeenCalledWith(expect.objectContaining({ status: 'READ', readAt: expect.any(String) }), 'n1');
  });
  it('propagates a failure from the orchestrator', async () => {
    const failure = new Error('read failed');
    const dependency = { updateNotification: jest.fn().mockRejectedValue(failure) };
    const service = new NotificationsMarkNotificationReadService(dependency as never);
    await expect(service.updateNotificationRead('n1')).rejects.toBe(failure);
  });
});
