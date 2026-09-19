import type { RevenueSortKey, RevenueSortDirection } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
export interface AdminPlansRevenueTableSortIconProps {
  column: RevenueSortKey;
  sortKey: RevenueSortKey;
  sortDir: RevenueSortDirection;
}
