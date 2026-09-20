import type { PayoutSortKey, PayoutSortDirection } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';
export interface AdminPayoutsSummaryTableSortIconProps {
  column: PayoutSortKey;
  sortKey: PayoutSortKey;
  sortDir: PayoutSortDirection;
}
