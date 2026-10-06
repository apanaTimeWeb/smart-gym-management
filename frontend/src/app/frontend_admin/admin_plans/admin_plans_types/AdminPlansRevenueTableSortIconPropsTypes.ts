import type { RevenueSortKey, RevenueSortDirection } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';
export interface AdminPlansRevenueTableSortIconProps {
  column: RevenueSortKey;
  sortKey: RevenueSortKey;
  sortDir: RevenueSortDirection;
}
