import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminBranchesStore } from '@/app/frontend_admin/admin_branches/admin_branches_store/useAdminBranchesStore';

describe('useAdminBranchesStore', () => {
  beforeEach(() => useAdminBranchesStore.setState({ selectedBranchId: null, detailView: null, search: '', statusFilter: 'all', timeRange: 'monthly' }));

  it('tracks the selected branch for detail rendering', () => {
    useAdminBranchesStore.getState().setSelectedBranchId('branch-7');
    expect(useAdminBranchesStore.getState().selectedBranchId).toBe('branch-7');
  });

  it('tracks branch detail view state independently from server data', () => {
    useAdminBranchesStore.getState().setDetailView('overview');
    expect(useAdminBranchesStore.getState().detailView).toBe('overview');
  });

  it('stores filter and time-range preferences', () => {
    const store = useAdminBranchesStore.getState();
    store.setSearch('Jaipur');
    store.setStatusFilter('active');
    store.setTimeRange('yearly');
    expect(useAdminBranchesStore.getState()).toMatchObject({ search: 'Jaipur', statusFilter: 'active', timeRange: 'yearly' });
  });
});
