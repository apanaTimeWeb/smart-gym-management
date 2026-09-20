import { describe, expect, it } from 'vitest';
import { getSuperadminCouponsPresetRange } from '@/app/superadmin/saas-billing/coupons/SuperadminCouponsDateRangeUtils';

describe('getSuperadminCouponsPresetRange', () => {
  it('returns deterministic preset bounds', () => {
    expect(getSuperadminCouponsPresetRange('this_month', new Date(2026, 8, 20))).toEqual({ from: '2026-09-01', to: '2026-09-30' });
  });
});
