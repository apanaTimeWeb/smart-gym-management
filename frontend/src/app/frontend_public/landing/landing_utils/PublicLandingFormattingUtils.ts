// RESPONSIBILITY: Formats PublicLanding-owned monetary values from API-compatible minor units using the active locale.
/** Formats an API-compatible minor-unit amount with locale-aware currency rules. */
export function formatPublicLandingCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const subunitMap: Record<string, number> = { JPY: 1, KWD: 1000, BHD: 1000 };
  const divisor = subunitMap[currencyCode] ?? 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: divisor === 1000 ? 3 : divisor === 1 ? 0 : 2,
    maximumFractionDigits: divisor === 1000 ? 3 : divisor === 1 ? 0 : 2,
  }).format(amountMinor / divisor);
}
