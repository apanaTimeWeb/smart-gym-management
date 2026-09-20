// RESPONSIBILITY: Owns static Attendance UI labels, filters, and table metadata only.
export const ATTENDANCE_TABLE_HEADERS = ['Name', 'Type', 'Date', 'Check In', 'Check Out', 'Duration', 'Method'] as const;

export const ATTENDANCE_TABS = ['Members', 'My Attendance'] as const;
export type AttendanceTab = (typeof ATTENDANCE_TABS)[number];

export const ATTENDANCE_DATE_FILTER_OPTIONS = [
  { value: 'All Time', label: 'All Time' },
  { value: 'Today', label: 'Today' },
  { value: 'Yesterday', label: 'Yesterday' },
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'This Month', label: 'This Month' },
] as const;
