// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { NotificationsFindNotificationKPIsService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-find-notification-k-p-is.service';

describe('NotificationsFindNotificationKPIsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findNotificationsList: jest.fn().mockResolvedValue(expected) };
    const service = new NotificationsFindNotificationKPIsService(dependency as never);
    const result = await service.findNotificationKPIs({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findNotificationsList).toHaveBeenCalledTimes(1);
    expect(dependency.findNotificationsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findNotificationsList: jest.fn().mockRejectedValue(failure) };
    const service = new NotificationsFindNotificationKPIsService(dependency as never);
    await expect(service.findNotificationKPIs({} as never)).rejects.toBe(failure);
    expect(dependency.findNotificationsList).toHaveBeenCalledTimes(1);
  });
});
