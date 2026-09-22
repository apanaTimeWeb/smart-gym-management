import { useTranslations } from 'next-intl';

export function formatCurrency(amount: number, currencyCode: string = 'INR', locale: string = 'en-IN'): string {
  if (isNaN(amount)) return '0';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}
