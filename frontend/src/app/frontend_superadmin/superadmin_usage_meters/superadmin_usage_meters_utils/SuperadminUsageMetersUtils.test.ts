import { describe, expect, it } from 'vitest';

import { formatUsageStorage, getPercentage, getProgressColor } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_utils/SuperadminUsageMetersUtils';



describe('SuperadminUsageMetersUtils', () => {
  it('maps usage thresholds to semantic progress colors', () => {
    expect(getProgressColor(95, 100)).toBe('bg-danger');
    expect(getProgressColor(80, 100)).toBe('bg-warning');
    expect(getProgressColor(40, 100)).toBe('bg-primary');
    expect(getProgressColor(0, 0)).toBe('bg-primary');
  });

  it('clamps usage percentage to the documented 0–100 range', () => {
    expect(getPercentage(50, 100)).toBe(50);
    expect(getPercentage(200, 100)).toBe(100);
    expect(getPercentage(-20, 100)).toBe(0);
    expect(getPercentage(1, 0)).toBe(0);
  });

  it('formats storage through the module formatter', () => {
    expect(formatUsageStorage(12.345)).toContain('12.35');
  });
});
