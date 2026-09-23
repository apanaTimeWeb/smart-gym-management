// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { NotificationsDeleteNotificationService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-delete-notification.service';

describe('NotificationsDeleteNotificationService', () => {
  it('soft-deletes through the orchestrator and returns null', async () => {
    const dependency = { softDeleteNotificationsById: jest.fn().mockResolvedValue({ id: 'n1' }) };
    const service = new NotificationsDeleteNotificationService(dependency as never);
    const result = await service.deleteNotification('n1');
    expect(result).toBeNull();
    expect(dependency.softDeleteNotificationsById).toHaveBeenCalledWith('n1');
  });
  it('propagates a soft-delete failure', async () => {
    const failure = new Error('delete failed');
    const dependency = { softDeleteNotificationsById: jest.fn().mockRejectedValue(failure) };
    const service = new NotificationsDeleteNotificationService(dependency as never);
    await expect(service.deleteNotification('n1')).rejects.toBe(failure);
  });
});
