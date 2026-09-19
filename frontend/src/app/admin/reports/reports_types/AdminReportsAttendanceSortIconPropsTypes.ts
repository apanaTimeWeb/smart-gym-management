import type { AttendanceSortKey, AttendanceSortDirection } from '@/app/admin/reports/reports_types/AdminReportsAttendanceTypes';
export interface AdminReportsAttendanceSortIconProps {
  column: AttendanceSortKey;
  sortKey: AttendanceSortKey;
  sortDir: AttendanceSortDirection;
}
