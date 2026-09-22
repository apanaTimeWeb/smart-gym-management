// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for NotificationsMarkAllNotificationsReadService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> NotificationsMarkAllNotificationsReadService.markAllNotificationsRead -> observable return/delegation.
import { NotificationsMarkAllNotificationsReadService } from '@/backend_manager/modules/manager/notifications/services/notifications-mark-all-notifications-read.service';

describe('NotificationsMarkAllNotificationsReadService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'notifications' } as const;
    const dependency = { markAllNotificationsRead: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new NotificationsMarkAllNotificationsReadService(dependency as never);
    const result = await service.markAllNotificationsRead({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.markAllNotificationsRead as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
