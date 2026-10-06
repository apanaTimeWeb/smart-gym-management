import { format, parseISO } from 'date-fns';
// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Attendance module.

/**
 * @description Provides the ManagerAttendanceSharedConstants implementation for the attendance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const formatTime = (d?: string) => 
 d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—';

export const ATTENDANCE_TABLE_HEADERS = [
  'Name', 'Type', 'Status', 'Date', 'Check In', 'Check Out', 'Duration', 'Method', 'Actions'
];

export const ATTENDANCE_TABS = ['Member Attendance', 'Trainer Attendance', 'Staff Attendance', 'Daily Attendance Report'] as const;
export type AttendanceTab = typeof ATTENDANCE_TABS[number];




/** Formats an attendance calendar heading with a stable month/year locale. */
export function formatAttendanceMonthYear(value: Date | string): string {
  return format(parseISO(value), 'MMMM yyyy');
}

export const ATTENDANCE_MEMBER_STATUS_VALUES = ['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED'] as const;

export const ATTENDANCE_STAFF_STATUS_VALUES = ['ACTIVE', 'INACTIVE', 'ON_LEAVE'] as const;
