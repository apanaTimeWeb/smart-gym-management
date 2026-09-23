// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { NotificationsMarkAllNotificationsReadService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-mark-all-notifications-read.service';

describe('NotificationsMarkAllNotificationsReadService', () => {
  it('returns null after the orchestrator completes the bulk mutation', async () => {
    const dependency = { markAllNotificationsRead: jest.fn().mockResolvedValue(3) };
    const service = new NotificationsMarkAllNotificationsReadService(dependency as never);
    const result = await service.markAllNotificationsRead();
    expect(result).toBeNull();
    expect(dependency.markAllNotificationsRead).toHaveBeenCalledTimes(1);
  });
  it('propagates a bulk mutation failure', async () => {
    const failure = new Error('bulk read failed');
    const dependency = { markAllNotificationsRead: jest.fn().mockRejectedValue(failure) };
    const service = new NotificationsMarkAllNotificationsReadService(dependency as never);
    await expect(service.markAllNotificationsRead()).rejects.toBe(failure);
  });
});
