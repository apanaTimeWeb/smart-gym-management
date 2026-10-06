// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { DateRangeFilter } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceTypes';
export interface AdminAttendanceQueryParams {
  page: number;
  limit: number;
  branchId?: string;
  search?: string;
  status?: string;
  dateRange?: DateRangeFilter;
}
