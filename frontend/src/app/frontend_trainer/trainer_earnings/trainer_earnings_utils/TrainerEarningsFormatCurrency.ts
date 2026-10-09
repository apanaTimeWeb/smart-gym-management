// RESPONSIBILITY: Formats Trainer Earnings monetary values from backend minor units using the active locale and ISO 4217 currency contract.

/**
 * @description Formats Trainer Earnings monetary values from backend minor units using the active locale and ISO 4217 currency contract.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export const TrainerEarningsFormatCurrency = (amount: number, currency: string, locale: string): string => {
  const subunitMap: Record<string, number> = {
    JPY: 1,
    KWD: 1000,
    BHD: 1000,
  };
  const divisor = subunitMap[currency] ?? 100;
  const fractionDigits = divisor === 1000 ? 3 : divisor === 1 ? 0 : 2;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount / divisor);
};
