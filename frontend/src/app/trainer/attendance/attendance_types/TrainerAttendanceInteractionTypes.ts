// RESPONSIBILITY: Defines Attendance URL/query interaction contracts, sortable fields, and calendar types.
export const ATTENDANCE_RECORD_TYPES = ['MEMBER', 'STAFF'] as const;
export type AttendanceRecordType = (typeof ATTENDANCE_RECORD_TYPES)[number];

export const ATTENDANCE_VIEW_MODES = ['calendar', 'table'] as const;
export type AttendanceViewMode = (typeof ATTENDANCE_VIEW_MODES)[number];

export const ATTENDANCE_CALENDAR_STATUSES = ['P', 'A', 'L', 'UPCOMING'] as const;
export type AttendanceCalendarStatus = (typeof ATTENDANCE_CALENDAR_STATUSES)[number];

export const ATTENDANCE_SORT_FIELDS = ['name', 'type', 'date', 'checkIn', 'checkOut', 'durationMinutes', 'checkInMethod'] as const;
export type AttendanceSortField = (typeof ATTENDANCE_SORT_FIELDS)[number];

export const ATTENDANCE_SORT_DIRECTIONS = ['asc', 'desc'] as const;
export type AttendanceSortDirection = (typeof ATTENDANCE_SORT_DIRECTIONS)[number];

export interface TrainerAttendanceCalendarCell {
  in?: string;
  out?: string;
  status: AttendanceCalendarStatus;
}

export interface TrainerAttendanceFetchParams {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
  type?: AttendanceRecordType;
  staffId?: string;
  sortBy?: AttendanceSortField;
  sortDirection?: AttendanceSortDirection;
}

export interface TrainerAttendanceRecordsQueryParams {
  tab: import('@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants').AttendanceTab;
  search: string;
  filterDate: string;
  currentPage: number;
  sortBy: AttendanceSortField;
  sortDirection: AttendanceSortDirection;
}
