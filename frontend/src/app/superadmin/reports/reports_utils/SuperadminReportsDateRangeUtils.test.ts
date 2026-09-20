import { describe, expect, it } from 'vitest';
import { getSuperadminReportsPresetRange } from '@/app/superadmin/reports/reports_utils/SuperadminReportsDateRangeUtils';

describe('getSuperadminReportsPresetRange', () => {
  it('returns deterministic year bounds', () => {
    expect(getSuperadminReportsPresetRange('THIS_YEAR', new Date(2026, 8, 20))).toEqual({ from: '2026-01-01', to: '2026-12-31' });
  });
});
