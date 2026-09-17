"use client";
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAdminNotificationsPage } from '@/app/admin/notifications/notifications_utils/useAdminNotificationsPage';

const mockUseQuery = vi.fn();
const mockInvalidate = vi.fn();
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: mockInvalidate }),
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
  useMutation: () => ({ mutate: vi.fn(), isPending: false }),
}));
vi.mock('@/app/admin/notifications/notifications_api/AdminNotificationsApi', () => ({
  AdminNotificationsApi: { fetchNotifications: vi.fn(), markNotificationAsRead: vi.fn(), markAllNotificationsAsRead: vi.fn() },
}));

beforeEach(() => {
  mockUseQuery.mockReturnValue({ data: { data: [] }, isLoading: false, isError: false, refetch: vi.fn() });
});

describe('useAdminNotificationsPage', () => {
  it('exposes notifications from the TanStack Query response', () => {
    mockUseQuery.mockReturnValueOnce({
      data: { data: [{ id: '1', title: 'Payment received', body: 'Invoice #1', createdAt: '2026-09-16T10:00:00Z', read: false, severity: 'INFO' }] },
      isLoading: false, isError: false, refetch: vi.fn(),
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
