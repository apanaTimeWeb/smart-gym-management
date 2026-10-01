// DATA FLOW: API / URL state / module client state → useSuperadminAnalyticsChartViewModel → superadmin_analytics view components.
import { describe, expect, it } from 'vitest';
import * as subject from "@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsChartViewModel";

describe('useSuperadminAnalyticsChartViewModel', () => {
  it('exports useSuperadminAnalyticsChartViewModel from the owning utility boundary', () => {
    expect(typeof subject.useSuperadminAnalyticsChartViewModel).toBe('function');
  });
});
