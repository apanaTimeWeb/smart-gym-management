import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminAnnouncementsApi } from '@/app/frontend_admin/admin_announcements/admin_announcements_api/AdminAnnouncementsApi';
import { useAdminAnnouncementsMutations } from '@/app/frontend_admin/admin_announcements/admin_announcements_hooks/useAdminAnnouncementsMutations';

vi.mock('@/app/frontend_admin/admin_announcements/admin_announcements_api/AdminAnnouncementsApi', () => ({
  AdminAnnouncementsApi: {
    createAnnouncement: vi.fn().mockResolvedValue({ message: 'ok' }),
    updateAnnouncement: vi.fn().mockResolvedValue({ message: 'ok' }),
    deleteAnnouncement: vi.fn().mockResolvedValue({ message: 'ok' }),
    togglePin: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminAnnouncementsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminAnnouncementsMutations(), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminAnnouncementsApi.createAnnouncement).toHaveBeenCalled());
  });
});
