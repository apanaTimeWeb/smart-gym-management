// RESPONSIBILITY: Core UI component/route for the admin module orchestrating views and displaying sub-components.
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminNotificationsClient from '@/app/frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_client/AdminNotificationsClient';

vi.mock('@/app/frontend_admin/admin_notifications/admin_notifications_hooks/useAdminNotificationsPage', () => ({
  useAdminNotificationsPage: () => ({
    notifications: [
      { id: '1', text: 'Test notification one', time: '5m ago', unread: true },
      { id: '2', text: 'Test notification two', time: '1h ago', unread: false },
    ],
    status: 'success',
    markAllAsRead: vi.fn(),
    clearAll: vi.fn(),
    markAsRead: vi.fn(),
  }),
}));

vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({
  useAdminLayoutConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }),
}));

vi.mock('@/app/frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_list/AdminNotificationsList.tsx', () => ({
  default: ({ notifications }: { notifications: unknown[] }) => (
    <div data-testid="admin_notifications-admin_notifications-list">{notifications.length} items</div>
  ),
}));

describe('admin_notifications_client', () => {
  it('renders the All Notifications heading', () => {
    render(<AdminNotificationsClient />);
    expect(screen.getByText('All Notifications')).toBeInTheDocument();
  });

  it('shows unread count badge when there are unread notifications', () => {
    render(<AdminNotificationsClient />);
    expect(screen.getByText('1 New')).toBeInTheDocument();
  });

  it('renders Mark all read button', () => {
    render(<AdminNotificationsClient />);
    expect(screen.getByText(/Mark all read/i)).toBeInTheDocument();
  });

  it('renders the notifications list', () => {
    render(<AdminNotificationsClient />);
    expect(screen.getByTestId('notifications-list')).toBeInTheDocument();
  });

  
});
