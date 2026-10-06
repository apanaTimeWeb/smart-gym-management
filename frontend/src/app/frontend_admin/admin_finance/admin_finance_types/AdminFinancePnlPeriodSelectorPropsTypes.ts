import type { PnlPeriod } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
export interface AdminFinancePnlPeriodSelectorProps {
  period: PnlPeriod;
  onPeriodChange: (p: PnlPeriod) => void;
}
