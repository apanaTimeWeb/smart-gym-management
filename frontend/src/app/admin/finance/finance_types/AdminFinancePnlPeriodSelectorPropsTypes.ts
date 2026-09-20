import type { PnlPeriod } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
export interface AdminFinancePnlPeriodSelectorProps {
  period: PnlPeriod;
  onPeriodChange: (p: PnlPeriod) => void;
}
