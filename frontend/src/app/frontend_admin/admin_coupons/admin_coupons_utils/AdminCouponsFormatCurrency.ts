// RESPONSIBILITY: Formats documented coupon monetary values in the Admin module using the active interface locale.
const COUPON_CURRENCY_CODE = 'INR';
/**
 * @description Implements AdminCouponsFormatCurrency for the owning Admin feature module.
 * @dependencies Uses only module-owned types/constants and approved application infrastructure.
 * @edge-case Preserves documented nullable, locale, validation, and ordering semantics.
 */
export function AdminCouponsFormatCurrency(amountMinor: number, locale: string): string {
  if (!Number.isFinite(amountMinor)) return '—';
  const fractionDigits = new Intl.NumberFormat(locale, { style: 'currency', currency: COUPON_CURRENCY_CODE }).resolvedOptions().maximumFractionDigits ?? 2;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: COUPON_CURRENCY_CODE, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(amountMinor / (10 ** fractionDigits));
}
