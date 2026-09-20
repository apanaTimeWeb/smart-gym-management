// RESPONSIBILITY: Type contracts for Attendance URL/query interactions, UI view mode, and calendar rendering.
export const ATTENDANCE_RECORD_TYPES = ['MEMBER', 'STAFF'] as const;
export type AttendanceRecordType = (typeof ATTENDANCE_RECORD_TYPES)[number];

export const ATTENDANCE_VIEW_MODES = ['calendar', 'table'] as const;
export type AttendanceViewMode = (typeof ATTENDANCE_VIEW_MODES)[number];

export const ATTENDANCE_CALENDAR_STATUSES = ['P', 'A', 'L', 'UPCOMING'] as const;
export type AttendanceCalendarStatus = (typeof ATTENDANCE_CALENDAR_STATUSES)[number];

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
}

export interface TrainerAttendanceRecordsQueryParams {
  tab: import('@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants').AttendanceTab;
  search: string;
  filterDate: string;
  currentPage: number;
}
