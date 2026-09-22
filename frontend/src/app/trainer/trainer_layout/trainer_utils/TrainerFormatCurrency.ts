// RESPONSIBILITY: Reusable currency formatter ensuring compliance with the Enterprise UI/UX rules.
// This utility MUST be used for all monetary formatting across the trainer module to respect the current locale dynamically.

export function formatCurrency(amount: number, currencyCode: string = 'INR', locale: string): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount / 100);
}
