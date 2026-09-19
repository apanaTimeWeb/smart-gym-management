import type { BranchPnlRecord, PnlSortKey, PnlSortDirection, PnlStatusFilter } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
export interface AdminFinancePnlTableProps {
  data: BranchPnlRecord[];
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
  onSort: (key: PnlSortKey) => void;
  expandedBranchId: string | null;
  onToggleExpand: (branchId: string) => void;
  statusFilter: PnlStatusFilter;
  onResetFilter: () => void;
}
