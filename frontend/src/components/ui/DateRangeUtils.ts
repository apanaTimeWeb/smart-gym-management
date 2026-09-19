// RESPONSIBILITY: Pure date-only range calculation and serialization for Superadmin date filters.
/**
 * Computes a date-only range using the browser's local calendar timezone.
 * Input: a supported range key and optional Date clock value. Output: `YYYY-MM-DD` start/end strings.
 * Invariant: date-only filters are serialized without UTC conversion so midnight cannot cross a calendar boundary.
 */
import type { DateRangeOption } from '@/components/ui/DateRangeConstants';

function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDateRange(option: Exclude<DateRangeOption, 'custom'>, now = new Date()): { start: string; end: string } {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  if (option === 'this_week') start.setDate(start.getDate() - start.getDay());
  if (option === 'this_month') start.setDate(1);
  if (option === 'this_year') {
    start.setMonth(0, 1);
  }
  return { start: formatDateOnly(start), end: formatDateOnly(end) };
}

export function serializeSuperadminCustomDateRange(start: string, end: string): { start: string; end: string } {
  return { start: start.trim(), end: end.trim() };
}
