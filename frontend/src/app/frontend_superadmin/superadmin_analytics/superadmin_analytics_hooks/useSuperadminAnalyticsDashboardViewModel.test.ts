// DATA FLOW: API / URL state / module client state → useSuperadminAnalyticsDashboardViewModel → superadmin_analytics view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminAnalyticsDashboardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsDashboardViewModel';



describe('useSuperadminAnalyticsDashboardViewModel', () => {
  it('exports the module-owned analytics dashboard view-model', () => {
    expect(useSuperadminAnalyticsDashboardViewModel).toBeTypeOf('function');
  });
});
