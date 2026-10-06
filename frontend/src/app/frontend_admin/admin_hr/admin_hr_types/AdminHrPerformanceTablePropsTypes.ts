import type { StaffPerformanceRecord, PerformanceSortKey, PerformanceSortDirection } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';
export interface AdminHrPerformanceTableProps {
  data: StaffPerformanceRecord[];
  sortKey: PerformanceSortKey;
  sortDir: PerformanceSortDirection;
  onSort: (key: PerformanceSortKey) => void;
}
