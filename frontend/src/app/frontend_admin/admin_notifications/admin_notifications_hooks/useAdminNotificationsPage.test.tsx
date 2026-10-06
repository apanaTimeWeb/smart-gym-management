import React from 'react';
import { NOTIFICATION_SEVERITY } from '@/app/frontend_admin/admin_notifications/admin_notifications_constants/AdminNotificationsConstants';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminNotificationsPage } from '@/app/frontend_admin/admin_notifications/admin_notifications_hooks/useAdminNotificationsPage';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_notifications/admin_notifications_api/AdminNotificationsApi';

vi.mock('@/app/frontend_admin/admin_notifications/admin_notifications_api/AdminNotificationsApi', () => ({
  AdminNotificationsApi: {
    fetchNotifications: vi.fn(),
    markNotificationAsRead: vi.fn(),
    markAllNotificationsAsRead: vi.fn(),
  },
}));

vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService', () => ({
  adminToast: { success: vi.fn(), error: vi.fn() },
}));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useAdminNotificationsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AdminNotificationsApi.fetchNotifications).mockResolvedValue({ success: true, message: 'ok', data: [] });
  });

  it('passes a stable key to mark-as-read and reuses it after failure', async () => {
    vi.mocked(AdminNotificationsApi.markNotificationAsRead)
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockResolvedValueOnce({ success: true, message: 'Notification marked as read', data: null });

    const { result } = renderHook(() => useAdminNotificationsPage(), { wrapper: createWrapper() });

    await act(async () => { result.current.markAsRead('n1'); });
    await waitFor(() => expect(AdminNotificationsApi.markNotificationAsRead).toHaveBeenCalledTimes(1));
    await act(async () => { result.current.markAsRead('n1'); });
    await waitFor(() => expect(AdminNotificationsApi.markNotificationAsRead).toHaveBeenCalledTimes(2));

    const calls = vi.mocked(AdminNotificationsApi.markNotificationAsRead).mock.calls;
    expect(calls[0]?.[0]).toBe('n1');
    expect(calls[1]?.[0]).toBe('n1');
    expect(calls[0]?.[1]).toBe(calls[1]?.[1]);
  });

  it('exposes notifications from the TanStack Query response', () => {
    mockUseQuery.mockReturnValueOnce({
      data: { data: [{ id: '1', title: 'Payment received', body: 'Invoice #1', createdAt: '2026-09-16T10:00:00Z', read: false, severity: NOTIFICATION_SEVERITY.INFO }] },
      isPending: false, isError: false, status: 'success', refetch: vi.fn(),
    });
    const { result } = renderHook(() => useAdminNotificationsPage());
    expect(result.current.notifications[0]?.id).toBe('1');
    expect(result.current.notifications[0]?.unread).toBe(true);
  });

  it('does not expose a delete mutation unsupported by the API contract', () => {
    const { result } = renderHook(() => useAdminNotificationsPage());
    expect('deleteNotification' in result.current).toBe(false);
  });
});
