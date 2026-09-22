// RESPONSIBILITY: Co-located behavioral unit proof for NotificationsFetchManagerNotificationsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> NotificationsFetchManagerNotificationsService.fetchManagerNotifications -> observable return/delegation.
import { NotificationsFetchManagerNotificationsService } from '@/modules/manager/notifications/services/notifications-fetch-manager-notifications.service.ts';

describe('NotificationsFetchManagerNotificationsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'notifications' } as const;
    const dependency = { fetchManagerNotifications: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new NotificationsFetchManagerNotificationsService(dependency as never);
    const result = await service.fetchManagerNotifications({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchManagerNotifications as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
