// RESPONSIBILITY: Co-located behavioral unit proof for NotificationsDeleteNotificationService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> NotificationsDeleteNotificationService.deleteNotification -> observable return/delegation.
import { NotificationsDeleteNotificationService } from '@/modules/manager/notifications/services/notifications-delete-notification.service.ts';

describe('NotificationsDeleteNotificationService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'notifications' } as const;
    const dependency = { deleteNotification: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new NotificationsDeleteNotificationService(dependency as never);
    const result = await service.deleteNotification({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteNotification as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
