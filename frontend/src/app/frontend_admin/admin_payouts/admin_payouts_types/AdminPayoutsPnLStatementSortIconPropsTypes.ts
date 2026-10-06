import type { PnlSortKey, PnlSortDirection } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';
export interface AdminPayoutsPnLStatementSortIconProps {
  column: PnlSortKey;
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
}
