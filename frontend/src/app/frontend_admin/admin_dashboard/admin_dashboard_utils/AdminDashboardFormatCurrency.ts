/**
 * AdminDashboardFormatCurrency formats an API monetary amount expressed in the smallest ISO-4217 currency unit.
 * @param amountMinor integer amount in paise/cents/minor currency units.
 * @param currencyCode ISO 4217 currency code.
 * @param locale active BCP-47 locale used for formatting.
 */
export function AdminDashboardFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  if (!Number.isFinite(amountMinor)) return '—';
  const probe = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode });
  const fractionDigits = probe.resolvedOptions().maximumFractionDigits ?? 2;
  const divisor = 10 ** fractionDigits;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: fractionDigits }).format(amountMinor / divisor);
}
