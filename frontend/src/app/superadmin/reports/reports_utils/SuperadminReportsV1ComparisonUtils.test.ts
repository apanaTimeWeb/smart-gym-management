import { describe, expect, it } from 'vitest';
import { getSuperadminReportsV1ComparisonMetrics } from '@/app/superadmin/reports/reports_utils/SuperadminReportsV1ComparisonUtils.ts';

describe('getSuperadminReportsV1ComparisonMetrics', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof getSuperadminReportsV1ComparisonMetrics).toBe('function');
  });
});
