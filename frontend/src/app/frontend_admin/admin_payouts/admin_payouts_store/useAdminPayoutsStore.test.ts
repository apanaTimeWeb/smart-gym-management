import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminPayoutsStore } from '@/app/frontend_admin/admin_payouts/admin_payouts_store/useAdminPayoutsStore';

describe('useAdminPayoutsStore', () => {
  beforeEach(() => useAdminPayoutsStore.setState({ currentPage: 4, activeTab: 'summary', monthFilter: 'all', gymFilter: 'all', statusFilter: 'all' }));

  it('resets pagination when payout filters change', () => {
    useAdminPayoutsStore.getState().setMonthFilter('2026-09');
    expect(useAdminPayoutsStore.getState().currentPage).toBe(1);
    useAdminPayoutsStore.setState({ currentPage: 2 });
    useAdminPayoutsStore.getState().setGymFilter('gym-2');
    expect(useAdminPayoutsStore.getState().currentPage).toBe(1);
    useAdminPayoutsStore.setState({ currentPage: 5 });
    useAdminPayoutsStore.getState().setStatusFilter('PAID');
    expect(useAdminPayoutsStore.getState().currentPage).toBe(1);
  });

  it('tracks the active payouts view', () => {
    useAdminPayoutsStore.getState().setActiveTab('pnl');
    expect(useAdminPayoutsStore.getState().activeTab).toBe('pnl');
  });
});
