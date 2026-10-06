import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminPermissionsApi } from '@/app/frontend_admin/admin_permissions/admin_permissions_api/AdminPermissionsApi';
import { useAdminPermissionsMutations } from '@/app/frontend_admin/admin_permissions/admin_permissions_hooks/useAdminPermissionsMutations';

vi.mock('@/app/frontend_admin/admin_permissions/admin_permissions_api/AdminPermissionsApi', () => ({
  AdminPermissionsApi: {
    updateStaffPermission: vi.fn().mockResolvedValue({ message: 'ok' }),
    resetToDefaults: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminPermissionsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminPermissionsMutations(), { wrapper });
    await act(async () => { await result.current.updateStaffMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminPermissionsApi.updateStaffPermission).toHaveBeenCalled());
  });
});
