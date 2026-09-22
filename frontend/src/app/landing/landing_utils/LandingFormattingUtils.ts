// RESPONSIBILITY: Formats static Landing marketing values consistently with the application currency convention.
const LANDING_CURRENCY_CODE = 'INR';

/** Formats a numeric amount using the application's INR presentation convention. */
export function formatLandingCurrency(amountInr: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: LANDING_CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amountInr);
}
