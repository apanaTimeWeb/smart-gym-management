/**
 * Locale-aware numeric/date formatters owned by the Admin feature.
 * @remarks These utilities contain presentation formatting only; server data remains owned by TanStack Query.
 */

/** Formats an integer/number using the active UI locale. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);

/** Computes duration string from checkIn/checkOut times. Returns '—' if either is missing. */
export function computeDuration(checkIn: string, checkOut: string | null): string {
  if (!checkIn || !checkOut) return '—';
  const [inH, inM] = checkIn.replace(/ AM| PM/, '').split(':').map(Number);
  const [outH, outM] = checkOut.replace(/ AM| PM/, '').split(':').map(Number);
  const inMinutes  = (checkIn.includes('PM')  && (inH ?? 0)  !== 12 ? (inH ?? 0)  + 12 : (inH ?? 0))  * 60 + (inM  ?? 0);
  const outMinutes = (checkOut.includes('PM') && (outH ?? 0) !== 12 ? (outH ?? 0) + 12 : (outH ?? 0)) * 60 + (outM ?? 0);
  const diff = outMinutes - inMinutes;
  if (diff <= 0) return '—';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

