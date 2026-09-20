import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainerNotificationsMain from '@/app/trainer/notifications/notifications_components/TrainerNotificationsMain/TrainerNotificationsMain';
const markAllAsRead = vi.fn();
vi.mock('@/app/trainer/notifications/notifications_hooks/useTrainerNotificationsLogic', () => ({ useTrainerNotificationsLogic: () => ({ notifications: [{ id: 'n1', text: 'New member', time: '2m ago', unread: true, type: 'MEMBER' }], unreadCount: 1, isPending: false, isError: false, hasMore: false, loadingMore: false, loadMore: vi.fn(), markAllAsRead, markAsRead: vi.fn() }) }));
vi.mock('@/app/trainer/notifications/notifications_components/TrainerNotificationsList/TrainerNotificationsList', () => ({ default: () => <div data-testid="notifications-list">New member</div> }));
describe('TrainerNotificationsMain behavior', () => {
  it('marks all visible notifications as read through the feature logic', async () => {
    const user = userEvent.setup();
    render(<TrainerNotificationsMain />);
    await user.click(screen.getByRole('button', { name: 'Mark all as read' }));
    expect(markAllAsRead).toHaveBeenCalledTimes(1);
  });
});
