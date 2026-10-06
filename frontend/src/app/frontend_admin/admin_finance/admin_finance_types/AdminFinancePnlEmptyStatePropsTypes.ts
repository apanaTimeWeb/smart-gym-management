import type { PnlStatusFilter } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
export interface AdminFinancePnlEmptyStateProps {
  statusFilter: PnlStatusFilter;
  onReset: () => void;
}
