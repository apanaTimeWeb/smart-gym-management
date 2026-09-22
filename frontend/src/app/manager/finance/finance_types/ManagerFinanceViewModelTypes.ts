// RESPONSIBILITY: Return type contract for the Manager Finance feature facade.
import type { FinanceTab } from '@/app/manager/finance/finance_store/ManagerUseManagerFinanceUiStore';
import type { Payment, FinanceSummary } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


export interface ManagerFinanceViewModel {
  tab: FinanceTab;
  setTab: (tab: FinanceTab) => void;
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  methodFilter: string;
  setMethodFilter: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  payments: Payment[];
  summary: FinanceSummary | null;
  totalPayments: number;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  reload: () => void;

  exportPDF: () => void;
  printReceipt: (id: string) => void;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
}
