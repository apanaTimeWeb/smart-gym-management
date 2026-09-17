import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAdminPermissionsLogic } from '@/app/admin/permissions/permissions_context/useAdminPermissionsLogic';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { permissionsApi } from '@/app/admin/permissions/permissions_api/AdminPermissionsApi';

vi.mock('@/app/admin/admin_components/AdminFeedback/useAdminConfirm', () => ({ useAdminConfirm: vi.fn() }));
vi.mock('@/app/admin/permissions/permissions_api/AdminPermissionsApi', () => ({
  permissionsApi: {
    fetchPermissions: vi.fn().mockResolvedValue({ data: { roleDefaults: [{ role: 'manager', permissions: { 'members.read': true } }], gymOverrides: [] } }),
    updateRolePermissions: vi.fn().mockResolvedValue({ data: { roleDefaults: [], gymOverrides: [] }, message: 'Role updated' }),
    updateGymOverride: vi.fn().mockResolvedValue({ data: { roleDefaults: [], gymOverrides: [] }, message: 'Override updated' }),
  },
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useAdminPermissionsLogic revoke confirmation contract', () => {
  const confirm = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAdminConfirm).mockReturnValue({ confirm });
    confirm.mockResolvedValue(true);
  });

  it('requires confirmation when revoking an enabled role permission', async () => {
    const { result } = renderHook(() => useAdminPermissionsLogic(), { wrapper });
    await act(async () => {
      await result.current.updateRolePermission('manager', 'members.read', false);
    });
    expect(confirm).toHaveBeenCalledOnce();
    expect(permissionsApi.updateRolePermissions).toHaveBeenCalled();
  });

  it('does not submit a revoke when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminPermissionsLogic(), { wrapper });
    await act(async () => {
      await result.current.updateRolePermission('manager', 'members.read', false);
    });
    expect(permissionsApi.updateRolePermissions).not.toHaveBeenCalled();
  });
});
