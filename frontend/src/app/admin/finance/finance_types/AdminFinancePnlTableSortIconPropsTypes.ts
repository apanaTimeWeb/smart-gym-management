import type { PnlSortKey, PnlSortDirection } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
export interface AdminFinancePnlTableSortIconProps {
  column: string;
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
}
