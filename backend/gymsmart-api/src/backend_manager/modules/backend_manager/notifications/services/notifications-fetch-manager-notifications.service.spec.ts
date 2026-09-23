// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { NotificationsFetchManagerNotificationsService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-fetch-manager-notifications.service';

describe('NotificationsFetchManagerNotificationsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findNotificationsList: jest.fn().mockResolvedValue(expected) };
    const service = new NotificationsFetchManagerNotificationsService(dependency as never);
    const result = await service.fetchManagerNotifications({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findNotificationsList).toHaveBeenCalledTimes(1);
    expect(dependency.findNotificationsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findNotificationsList: jest.fn().mockRejectedValue(failure) };
    const service = new NotificationsFetchManagerNotificationsService(dependency as never);
    await expect(service.fetchManagerNotifications({} as never)).rejects.toBe(failure);
    expect(dependency.findNotificationsList).toHaveBeenCalledTimes(1);
  });
});
