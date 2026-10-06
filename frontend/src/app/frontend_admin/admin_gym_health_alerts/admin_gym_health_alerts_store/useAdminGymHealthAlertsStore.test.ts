import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminGymHealthAlertsStore } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_store/useAdminGymHealthAlertsStore';

describe('useAdminGymHealthAlertsStore', () => {
  beforeEach(() => useAdminGymHealthAlertsStore.setState({ severityFilter: 'all', search: '' }));

  it('stores severity filtering as UI state', () => {
    useAdminGymHealthAlertsStore.getState().setSeverityFilter('critical');
    expect(useAdminGymHealthAlertsStore.getState().severityFilter).toBe('critical');
  });

  it('stores search text without owning alert response data', () => {
    useAdminGymHealthAlertsStore.getState().setSearch('payment');
    const state = useAdminGymHealthAlertsStore.getState();
    expect(state.search).toBe('payment');
    expect('alerts' in state).toBe(false);
  });
});
