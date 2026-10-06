/**
 * Locale-aware numeric/date formatters owned by the Admin feature.
 * @remarks These utilities contain presentation formatting only; server data remains owned by TanStack Query.
 */

/** Formats an integer/number using the active UI locale. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);

/** Formats a UI date with a readable day/month/year presentation. */
export const formatDate = (value: Date | string | number, locale: string): string => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(date);
};
