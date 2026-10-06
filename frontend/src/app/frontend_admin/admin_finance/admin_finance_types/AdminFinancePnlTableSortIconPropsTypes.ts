import type { PnlSortKey, PnlSortDirection } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
export interface AdminFinancePnlTableSortIconProps {
  column: string;
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
}
