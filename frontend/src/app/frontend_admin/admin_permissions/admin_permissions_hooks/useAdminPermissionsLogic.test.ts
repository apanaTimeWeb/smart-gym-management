import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_permissions/admin_permissions_hooks/useAdminPermissionsLogic';

const confirm = vi.fn();
const updateStaffMutation = { mutate: vi.fn(), isPending: false };
const resetMutation = { mutateAsync: vi.fn(), isPending: false };
const setEditingStaffId = vi.fn();
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({ useAdminLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_permissions/admin_permissions_store/useAdminPermissionsStore', () => ({ useAdminPermissionsStore: () => ({ activeRole: 'all', staffSearch: 'riya', setEditingStaffId }) }));
vi.mock('@/app/frontend_admin/admin_permissions/admin_permissions_hooks/useAdminPermissionsMutations', () => ({ useAdminPermissionsMutations: () => ({ updateStaffMutation, resetMutation, getIntentKey, clearIntentKey }) }));

const queryResults = [
  { data: { data: [{ key: 'viewMembers' }] }, status: 'success' },
  { data: { data: [{ staffId: 's1', staffName: 'Riya Singh', role: 'manager' }, { staffId: 's2', staffName: 'Aman', role: 'trainer' }] }, status: 'success' },
];

describe('useAdminPermissionsLogic', () => {
  beforeEach(() => {
    confirm.mockReset();
    updateStaffMutation.mutate.mockReset();
    resetMutation.mutateAsync.mockReset();
    setEditingStaffId.mockReset();
    getIntentKey.mockClear();
    clearIntentKey.mockReset();
    vi.mocked(useQuery).mockReset();
    queryResults.forEach((value) => vi.mocked(useQuery).mockReturnValueOnce(value as never));
    confirm.mockResolvedValue(true);
    resetMutation.mutateAsync.mockResolvedValue({ message: 'ok' });
  });

  it('filters overrides by staff search and sends confirmed permission updates', async () => {
    const { result } = renderHook(() => useAdminPermissionsLogic());
    expect(result.current.overrides).toHaveLength(1);
    expect(result.current.overrides[0]?.staffId).toBe('s1');
    await result.current.toggleStaffPermission('s1', 'Riya Singh', 'viewMembers', true);
    expect(updateStaffMutation.mutate).toHaveBeenCalledWith({ staffId: 's1', permission: 'viewMembers', enabled: true, idempotencyKey: 'idem:permission:s1:viewMembers' });
  });

  it('clears the edit target after resetting defaults', async () => {
    const { result } = renderHook(() => useAdminPermissionsLogic());
    await result.current.resetToDefaults('s1', 'Riya Singh', 'manager' as never);
    expect(resetMutation.mutateAsync).toHaveBeenCalledWith({ staffId: 's1', idempotencyKey: 'idem:reset:s1' });
    expect(setEditingStaffId).toHaveBeenCalledWith(null);
  });
});
