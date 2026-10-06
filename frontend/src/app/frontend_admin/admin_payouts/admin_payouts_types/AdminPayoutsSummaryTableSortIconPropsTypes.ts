import type { PayoutSortKey, PayoutSortDirection } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';
export interface AdminPayoutsSummaryTableSortIconProps {
  column: PayoutSortKey;
  sortKey: PayoutSortKey;
  sortDir: PayoutSortDirection;
}
