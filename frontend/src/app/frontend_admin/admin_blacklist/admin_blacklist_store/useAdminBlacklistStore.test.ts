import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_store/useAdminBlacklistStore';

describe('useAdminBlacklistStore', () => {
  beforeEach(() => useAdminBlacklistStore.setState({ currentPage: 4, showModal: false, search: '', scopeFilter: 'all', gymFilter: 'all', activeTab: 'all' }));

  it('resets pagination when blacklist filters change', () => {
    useAdminBlacklistStore.getState().setSearch('blocked');
    expect(useAdminBlacklistStore.getState().currentPage).toBe(1);
    useAdminBlacklistStore.setState({ currentPage: 2 });
    useAdminBlacklistStore.getState().setScopeFilter('global');
    expect(useAdminBlacklistStore.getState().currentPage).toBe(1);
    useAdminBlacklistStore.setState({ currentPage: 5 });
    useAdminBlacklistStore.getState().setGymFilter('gym-2');
    expect(useAdminBlacklistStore.getState().currentPage).toBe(1);
  });

  it('controls the blacklist modal and active tab', () => {
    const store = useAdminBlacklistStore.getState();
    store.setShowModal(true);
    store.setActiveTab('cross-branch');
    expect(useAdminBlacklistStore.getState()).toMatchObject({ showModal: true, activeTab: 'cross_gym' });
  });
});
