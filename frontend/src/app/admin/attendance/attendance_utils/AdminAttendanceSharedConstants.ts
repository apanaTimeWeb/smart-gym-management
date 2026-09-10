// RESPONSIBILITY: Centralized mock data, filter options, table headers, and chart config for Admin Attendance module.
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint, DateRangeFilter } from '@/app/admin/attendance/attendance_types/attendance_types';

export const ATTENDANCE_ITEMS_PER_PAGE = 10;

export const DATE_RANGE_OPTIONS: { value: DateRangeFilter; label: string }[] = [
  { value: 'today',      label: 'Today' },
  { value: 'yesterday',  label: 'Yesterday' },
  { value: 'this_week',  label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
];

export const ATTENDANCE_STATUS_OPTIONS = [
  { value: 'all',     label: 'All Status' },
  { value: 'present', label: 'Present' },
  { value: 'late',    label: 'Late' },
  { value: 'absent',  label: 'Absent' },
] as const;

export const ATTENDANCE_TABLE_HEADERS = [
  'Member',
  'Branch',
  'Plan',
  'Trainer',
  'Check-In',
  'Check-Out',
  'Duration',
  'Status',
] as const;



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
