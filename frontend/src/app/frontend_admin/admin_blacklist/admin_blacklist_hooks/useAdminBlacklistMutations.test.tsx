import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_api/AdminBlacklistApi';
import { useAdminBlacklistMutations } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistMutations';

vi.mock('@/app/frontend_admin/admin_blacklist/admin_blacklist_api/AdminBlacklistApi', () => ({
  AdminBlacklistApi: {
    addToBlacklist: vi.fn().mockResolvedValue({ message: 'ok' }),
    removeFromBlacklist: vi.fn().mockResolvedValue({ message: 'ok' }),
    toggleBlacklist: vi.fn().mockResolvedValue({ message: 'ok' }),
    propagateToAllBranches: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminBlacklistMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminBlacklistMutations(), { wrapper });
    await act(async () => { await result.current.addMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalled());
  });
});
