import type { StaffPerformanceRecord, PerformanceSortKey, PerformanceSortDirection } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';
export interface AdminHrPerformanceTableProps {
  data: StaffPerformanceRecord[];
  sortKey: PerformanceSortKey;
  sortDir: PerformanceSortDirection;
  onSort: (key: PerformanceSortKey) => void;
}
