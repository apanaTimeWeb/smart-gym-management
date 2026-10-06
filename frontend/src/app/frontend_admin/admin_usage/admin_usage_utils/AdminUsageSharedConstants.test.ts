import { describe, expect, it } from 'vitest';
import { USAGE_WARNING_THRESHOLD, USAGE_CRITICAL_THRESHOLD } from '@/app/frontend_admin/admin_usage/admin_usage_constants/AdminUsageConstants';

describe('Admin usage thresholds', () => {
  it('uses the documented warning and critical ratios', () => {
    expect(USAGE_WARNING_THRESHOLD).toBe(0.8);
    expect(USAGE_CRITICAL_THRESHOLD).toBe(0.95);
    expect(USAGE_WARNING_THRESHOLD).toBeLessThan(USAGE_CRITICAL_THRESHOLD);
  });
});
