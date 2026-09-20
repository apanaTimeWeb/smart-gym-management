import { describe, expect, it } from 'vitest';
import { getSuperadminAnalyticsPresetRange } from '@/app/superadmin/analytics/analytics_utils/SuperadminAnalyticsDateRangeUtils';

describe('getSuperadminAnalyticsPresetRange', () => {
  it('returns deterministic month bounds', () => {
    expect(getSuperadminAnalyticsPresetRange('this_month', new Date(2026, 8, 20))).toEqual({ from: '2026-09-01', to: '2026-09-30' });
  });
});
