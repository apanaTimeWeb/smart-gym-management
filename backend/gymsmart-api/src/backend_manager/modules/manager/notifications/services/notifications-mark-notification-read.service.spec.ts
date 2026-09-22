// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for NotificationsMarkNotificationReadService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> NotificationsMarkNotificationReadService.markNotificationRead -> observable return/delegation.
import { NotificationsMarkNotificationReadService } from '@/backend_manager/modules/manager/notifications/services/notifications-mark-notification-read.service';

describe('NotificationsMarkNotificationReadService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'notifications' } as const;
    const dependency = { markNotificationRead: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new NotificationsMarkNotificationReadService(dependency as never);
    const result = await service.markNotificationRead({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.markNotificationRead as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
