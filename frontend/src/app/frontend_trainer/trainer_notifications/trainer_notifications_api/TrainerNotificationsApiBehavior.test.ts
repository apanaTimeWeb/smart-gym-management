import { describe, expect, it, vi } from 'vitest';

import { fetchTrainerNotifications, markTrainerNotificationsTrainerNotificationRead } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_api/TrainerNotificationsApi';

import { TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_constants/TrainerNotificationsConstants';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer notifications API behavior', () => {
  it('forwards pagination and returns server notifications', async () => {
    const notification = { id: 'n1', text: 'New member', time: '2m ago', unread: true, type: TRAINER_NOTIFICATIONS_TYPE_IDS[0] };
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { notifications: [notification], total: 1 } });
    const result = await fetchTrainerNotifications(2, 20);
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(apiFetch.mock.calls[0][0]).toContain('limit=20');
    expect(result.notifications[0]?.text).toBe('New member');
  });
  it('uses PATCH for marking a notification read', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Marked read', data: null });
    await markTrainerNotificationsTrainerNotificationRead('n1', 'notifications-read-test-key');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH' });
  });


  it('rejects a success:false envelope for read mutations', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, message: 'Could not mark as read', data: null });
    await expect(markTrainerNotificationsTrainerNotificationRead('notification-1', 'notification-read-key')).rejects.toThrow();
  });
});
