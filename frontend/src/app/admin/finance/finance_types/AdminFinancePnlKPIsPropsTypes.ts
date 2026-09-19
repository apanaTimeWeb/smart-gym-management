import type { BranchPnlAggregates, PnlStatusFilter } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
export interface AdminFinancePnlKPIsProps {
  aggregates: BranchPnlAggregates;
  statusFilter: PnlStatusFilter;
  onStatusFilterChange: (f: PnlStatusFilter) => void;
}
