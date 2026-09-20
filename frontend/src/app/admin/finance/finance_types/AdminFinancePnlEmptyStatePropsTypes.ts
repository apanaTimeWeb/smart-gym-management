import type { PnlStatusFilter } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
export interface AdminFinancePnlEmptyStateProps {
  statusFilter: PnlStatusFilter;
  onReset: () => void;
}
