import type { AttendanceSortKey, AttendanceSortDirection } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsAttendanceTypes';
export interface AdminReportsAttendanceSortIconProps {
  column: AttendanceSortKey;
  sortKey: AttendanceSortKey;
  sortDir: AttendanceSortDirection;
}
