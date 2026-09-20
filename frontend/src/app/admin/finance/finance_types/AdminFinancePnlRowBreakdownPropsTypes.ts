import type { BranchPnlRecord } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
export interface AdminFinancePnlRowBreakdownProps {
  branch: BranchPnlRecord;
  colSpan: number;
}
