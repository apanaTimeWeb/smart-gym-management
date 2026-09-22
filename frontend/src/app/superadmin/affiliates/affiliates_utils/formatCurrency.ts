/**
 * Formats a monetary amount from its smallest unit to a locale-aware display string.
 * @param amount  Integer in smallest unit (e.g., 9999 for ₹99.99)
 * @param currency ISO 4217 currency code (e.g., 'INR', 'USD', 'EUR')
 * @param locale  BCP 47 locale string (e.g., 'en-IN', 'nl-NL', 'en-US')
 */
export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string
): string => {
  const subunitMap: Record<string, number> = {
    JPY: 1, KWD: 1000, BHD: 1000,
  };
  const divisor = subunitMap[currency] ?? 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: divisor === 1 ? 0 : 2,
  }).format(amount / divisor);
};
