import type { PnlSortKey, PnlSortDirection } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';
export interface AdminPayoutsPnLStatementSortIconProps {
  column: PnlSortKey;
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
}
