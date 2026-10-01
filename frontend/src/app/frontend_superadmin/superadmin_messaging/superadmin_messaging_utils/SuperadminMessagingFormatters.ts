// RESPONSIBILITY: Feature-local display formatting required by architecture Rule 80 and Rule 24.
import { format as formatDateValue, parseISO } from 'date-fns';
const getLocale = (): string => {
  if (typeof document !== 'undefined' && document.documentElement.lang) return document.documentElement.lang;
  return 'en-IN';
};
export function formatNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 0 }).format(value);
}
export function formatPercent1dp(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return `${new Intl.NumberFormat(getLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}
export function formatDateTime(value: string | number | Date | null | undefined): string {
  if (value == null || value === '') return '—';
  const date = value instanceof Date ? value : parseISO(String(value));
  if (Number.isNaN(date.getTime())) return '—';
  return formatDateValue(date, 'dd MMM yyyy, HH:mm');
}
export function formatDate(value: string | number | Date | null | undefined): string {
  if (value == null || value === '') return '—';
  const date = value instanceof Date ? value : parseISO(String(value));
  if (Number.isNaN(date.getTime())) return '—';
  return formatDateValue(date, 'dd MMM yyyy');
}
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || Number.isNaN(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds)); const h = Math.floor(total/3600); const m = Math.floor((total%3600)/60); const s = total%60;
  return h ? `${h}h ${m}m` : m ? `${m}m ${s}s` : `${s}s`;
}
export function formatKPI(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}
export function formatDecimal(value: number | null | undefined, maximumFractionDigits = 2): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits }).format(value);
}

export function superadminMessagingDisplayValue(value: string | number | null | undefined, fallback = '—'): string {
  if (value == null || value === '') return fallback;
  return String(value);
}

export function superadminMessagingMaskPhone(value: string | null | undefined): string {
  if (!value) return '—';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 8) return '—';
  const visibleStart = digits.slice(0, 2);
  const visibleEnd = digits.slice(-4);
  return `${visibleStart}${'*'.repeat(Math.max(1, digits.length - 6))}${visibleEnd}`;
}
