// RESPONSIBILITY: Formats static Landing marketing values consistently with the application currency convention.
const LANDING_CURRENCY_LOCALE = 'en-IN';
const LANDING_CURRENCY_CODE = 'INR';

/** Formats a numeric amount using the application's INR presentation convention. */
export function formatLandingCurrency(amountInr: number): string {
  return new Intl.NumberFormat(LANDING_CURRENCY_LOCALE, {
    style: 'currency',
    currency: LANDING_CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amountInr);
}
