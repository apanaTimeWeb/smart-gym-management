/**
 * Locale-aware numeric/date formatters owned by the Admin feature.
 * @remarks These utilities contain presentation formatting only; server data remains owned by TanStack Query.
 */

/** Formats an integer/number using the active UI locale. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);

/** Formats a percentage-like value with one decimal place using the active UI locale. */
export const formatPercent1dp = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

/** Formats a KPI using locale-aware compact notation for dashboard-scale values. */
export const formatKPI = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value);
