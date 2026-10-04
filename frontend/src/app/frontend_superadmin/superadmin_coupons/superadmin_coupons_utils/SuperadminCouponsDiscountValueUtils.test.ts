import { describe, expect, it } from 'vitest';

import {
  fromSuperadminCouponsMinorUnits,
  toSuperadminCouponsMinorUnits,
} from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDiscountValueUtils';

describe('SuperadminCouponsDiscountValueUtils', () => {
  it('converts INR major units to minor units', () => {
    expect(toSuperadminCouponsMinorUnits(500, 'INR')).toBe(50000);
    expect(toSuperadminCouponsMinorUnits(99.99, 'INR')).toBe(9999);
  });

  it('converts minor units back to editable major units', () => {
    expect(fromSuperadminCouponsMinorUnits(50000, 'INR')).toBe(500);
    expect(fromSuperadminCouponsMinorUnits(9999, 'INR')).toBe(99.99);
  });

  it('respects zero- and three-decimal currency rules', () => {
    expect(toSuperadminCouponsMinorUnits(500, 'JPY')).toBe(500);
    expect(toSuperadminCouponsMinorUnits(1.25, 'KWD')).toBe(1250);
  });
});
