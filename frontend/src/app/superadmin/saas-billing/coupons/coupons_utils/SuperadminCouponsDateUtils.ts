// RESPONSIBILITY: Returns today's ISO calendar date for coupon expiry UI without embedding browser-date logic in JSX.
export function getSuperadminCouponsTodayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}
