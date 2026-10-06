import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_notifications/admin_notifications_api/AdminNotificationsApi';
import { useAdminNotificationsMutations } from '@/app/frontend_admin/admin_notifications/admin_notifications_hooks/useAdminNotificationsMutations';

vi.mock('@/app/frontend_admin/admin_notifications/admin_notifications_api/AdminNotificationsApi', () => ({
  AdminNotificationsApi: {
    markNotificationAsRead: vi.fn().mockResolvedValue({ message: 'ok' }),
    markAllNotificationsAsRead: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminNotificationsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminNotificationsMutations(), { wrapper });
    await act(async () => { await result.current.markAsReadMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminNotificationsApi.markNotificationAsRead).toHaveBeenCalled());
  });
});
