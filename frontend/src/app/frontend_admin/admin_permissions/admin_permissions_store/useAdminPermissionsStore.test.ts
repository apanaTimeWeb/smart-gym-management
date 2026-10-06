import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_permissions/admin_permissions_store/useAdminPermissionsStore';

describe('useAdminPermissionsStore', () => {
  beforeEach(() => useAdminPermissionsStore.setState({ activeRole: 'all', staffSearch: '', editingStaffId: null }));

  it('tracks role filter and staff search as client UI state', () => {
    const store = useAdminPermissionsStore.getState();
    store.setActiveRole('MANAGER');
    store.setStaffSearch('Asha');
    expect(useAdminPermissionsStore.getState()).toMatchObject({ activeRole: 'MANAGER', staffSearch: 'Asha' });
  });

  it('tracks the staff record being edited without storing permissions data', () => {
    useAdminPermissionsStore.getState().setEditingStaffId('staff-5');
    const state = useAdminPermissionsStore.getState();
    expect(state.editingStaffId).toBe('staff-5');
    expect('permissions' in state).toBe(false);
  });
});
