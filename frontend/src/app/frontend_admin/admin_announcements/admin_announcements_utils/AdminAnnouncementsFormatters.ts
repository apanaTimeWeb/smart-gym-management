/**
 * Locale-aware numeric/date formatters owned by the Admin feature.
 * @remarks These utilities contain presentation formatting only; server data remains owned by TanStack Query.
 */

/** Formats an integer/number using the active UI locale. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);

/** Formats announcement dates with the active UI locale. */
export const formatDate = (value: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(new Date(value));
