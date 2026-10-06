import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminReportsStore } from '@/app/frontend_admin/admin_reports/admin_reports_store/useAdminReportsStore';

describe('useAdminReportsStore', () => {
  beforeEach(() => useAdminReportsStore.setState({ activeTab: 'revenue', dateRange: 'this_month', startDate: '', endDate: '', selectedGymId: 'all' }));

  it('tracks report view and custom date state', () => {
    const store = useAdminReportsStore.getState();
    store.setActiveTab('pnl');
    store.setCustomDateRange('2026-09-01', '2026-09-30');
    expect(useAdminReportsStore.getState()).toMatchObject({ activeTab: 'pnl', startDate: '2026-09-01', endDate: '2026-09-30' });
  });

  it('tracks gym scope as UI state', () => {
    useAdminReportsStore.getState().setSelectedGymId('gym-4');
    expect(useAdminReportsStore.getState().selectedGymId).toBe('gym-4');
  });
});
