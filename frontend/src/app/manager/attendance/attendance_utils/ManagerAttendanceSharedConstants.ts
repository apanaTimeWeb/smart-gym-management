// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Attendance module.

export const formatTime = (d?: string) => 
 d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—';

export const ATTENDANCE_TABLE_HEADERS = [
  'Name', 'Type', 'Status', 'Date', 'Check In', 'Check Out', 'Duration', 'Method', 'Actions'
];

export const ATTENDANCE_TABS = ['Member Attendance', 'Trainer Attendance', 'Staff Attendance', 'Daily Attendance Report'] as const;
export type AttendanceTab = typeof ATTENDANCE_TABS[number];




/** Formats an attendance calendar heading with a stable month/year locale. */
export function formatAttendanceMonthYear(value: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date(value));
}
