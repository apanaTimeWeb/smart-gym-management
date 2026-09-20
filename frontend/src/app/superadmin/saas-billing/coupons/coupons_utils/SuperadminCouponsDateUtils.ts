// RESPONSIBILITY: Converts API coupon dates into HTML date-input values.
/** Converts an API ISO date to the yyyy-MM-dd form required by an HTML date input. */
export function formatSuperadminCouponDateForInput(value: string): string {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Returns today's date in yyyy-MM-dd format for input min/max */
export function getSuperadminCouponsTodayISODate(): string {
  return formatSuperadminCouponDateForInput(new Date().toISOString());
}
