import type { BranchPnlAggregates, PnlStatusFilter } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
export interface AdminFinancePnlKPIsProps {
  aggregates: BranchPnlAggregates;
  statusFilter: PnlStatusFilter;
  onStatusFilterChange: (f: PnlStatusFilter) => void;
}
