// DATA FLOW: API / URL state / module client state → useSuperadminAnalyticsKpiViewModel → superadmin_analytics view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsKpiViewModel";

describe('useSuperadminAnalyticsKpiViewModel', () => {
  it('exports useSuperadminAnalyticsKpiViewModel from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminAnalyticsKpiViewModel).toBe('function');
  });
});
