// RESPONSIBILITY: TypeScript types and interfaces for the Admin Attendance module (read-only view).

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AttendanceStatus = 'present' | 'absent' | 'late';
export type DateRangeFilter = 'today' | 'yesterday' | 'this_week' | 'this_month' | 'last_month';

export interface AdminAttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  branchId: string;
  branchName: string;
  checkInTime: string;
  checkOutTime: string | null;
  date: string;
  status: AttendanceStatus;
  planName: string;
  trainerId?: string;
  trainerName?: string;
  sessionType?: 'General' | 'PT' | 'Class';
}

export interface AdminAttendanceSummary {
  todayTotal: number;
  todayPresent: number;
  todayLate: number;
  weeklyAverage: number;
  peakHour: string;
  trendVsLastWeek: number;
  uniqueMembersThisMonth: number;
}

export interface AdminAttendanceTrendPoint {
  date: string;
  count: number;
}
