// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { NotificationsFindManagerNotificationsService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-find-manager-notifications.service';

describe('NotificationsFindManagerNotificationsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findNotificationsList: jest.fn().mockResolvedValue(expected) };
    const service = new NotificationsFindManagerNotificationsService(dependency as never);
    const result = await service.findManagerNotifications({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findNotificationsList).toHaveBeenCalledTimes(1);
    expect(dependency.findNotificationsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findNotificationsList: jest.fn().mockRejectedValue(failure) };
    const service = new NotificationsFindManagerNotificationsService(dependency as never);
    await expect(service.findManagerNotifications({} as never)).rejects.toBe(failure);
    expect(dependency.findNotificationsList).toHaveBeenCalledTimes(1);
  });
});
