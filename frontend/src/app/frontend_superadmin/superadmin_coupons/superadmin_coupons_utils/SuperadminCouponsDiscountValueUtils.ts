/**
 * Formats and normalizes EXACT coupon discounts at the module boundary.
 * Form values are user-facing major units (e.g. 500.00 INR); API/record values are minor units.
 */
const SUBUNIT_DIVISORS: Record<string, number> = {
  JPY: 1,
  KWD: 1000,
  BHD: 1000,
};

export const getSuperadminCouponsCurrencyDivisor = (currencyCode: string): number =>
  SUBUNIT_DIVISORS[currencyCode] ?? 100;

export const toSuperadminCouponsMinorUnits = (amountMajor: number, currencyCode: string): number => {
  const divisor = getSuperadminCouponsCurrencyDivisor(currencyCode);
  return Math.round(amountMajor * divisor);
};

export const fromSuperadminCouponsMinorUnits = (amountMinor: number, currencyCode: string): number => {
  const divisor = getSuperadminCouponsCurrencyDivisor(currencyCode);
  return amountMinor / divisor;
};
