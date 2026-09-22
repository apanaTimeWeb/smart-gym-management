// RESPONSIBILITY: Co-located behavioral unit proof for NotificationsFetchNotificationKPIsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> NotificationsFetchNotificationKPIsService.fetchNotificationKPIs -> observable return/delegation.
import { NotificationsFetchNotificationKPIsService } from '@/modules/manager/notifications/services/notifications-fetch-notification-k-p-is.service.ts';

describe('NotificationsFetchNotificationKPIsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'notifications' } as const;
    const dependency = { fetchNotificationKPIs: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new NotificationsFetchNotificationKPIsService(dependency as never);
    const result = await service.fetchNotificationKPIs({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchNotificationKPIs as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
