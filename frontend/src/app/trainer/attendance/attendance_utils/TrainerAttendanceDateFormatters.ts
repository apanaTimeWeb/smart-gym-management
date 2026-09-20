// RESPONSIBILITY: Formats Attendance dates and times using the approved date-fns display contract.
import { format } from 'date-fns';

/** Formats a server date string for the Attendance UI. */
export function formatAttendanceDate(value: string): string {
  return format(new Date(value), 'dd MMM yyyy');
}

/** Formats an optional server timestamp for the Attendance UI, preserving missing values as an en dash. */
export function formatAttendanceTime(value?: string): string {
  return value ? format(new Date(value), 'HH:mm') : '—';
}
