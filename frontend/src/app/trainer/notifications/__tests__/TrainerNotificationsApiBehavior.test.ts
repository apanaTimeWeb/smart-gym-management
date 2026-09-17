import { describe, expect, it, vi } from 'vitest';
import { fetchTrainerNotifications, markTrainerNotificationRead } from '@/app/trainer/notifications/notifications_api/TrainerNotificationsApi';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer notifications API behavior', () => {
  it('forwards pagination and returns server notifications', async () => {
    const notification = { id: 'n1', text: 'New member', time: '2m ago', unread: true, type: 'MEMBER' };
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { notifications: [notification], total: 1 } });
    const result = await fetchTrainerNotifications(2, 20);
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(apiFetch.mock.calls[0][0]).toContain('limit=20');
    expect(result.notifications[0]?.text).toBe('New member');
  });
  it('uses PATCH for marking a notification read', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Marked read', data: null });
    await markTrainerNotificationRead('n1');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH' });
  });
});
