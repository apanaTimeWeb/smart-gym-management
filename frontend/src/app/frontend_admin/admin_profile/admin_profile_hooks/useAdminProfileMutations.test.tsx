import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/admin_profile_api/AdminProfileApi';
import { useAdminProfileMutations } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileMutations';

vi.mock('@/app/frontend_admin/admin_profile/admin_profile_api/AdminProfileApi', () => ({
  AdminProfileApi: {
    updateProfile: vi.fn().mockResolvedValue({ message: 'ok' }),
    updatePassword: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminProfileMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminProfileMutations(), { wrapper });
    await act(async () => { await result.current.profileMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminProfileApi.updateProfile).toHaveBeenCalled());
  });
});
