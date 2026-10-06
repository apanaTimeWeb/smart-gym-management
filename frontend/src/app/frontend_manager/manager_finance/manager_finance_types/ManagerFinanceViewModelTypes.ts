import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { FinanceTab } from '@/app/frontend_manager/manager_finance/manager_finance_store/useManagerFinanceUiStore';
import type { Payment, FinanceSummary } from '@/app/frontend_manager/manager_finance/manager_finance_types/ManagerFinanceTypes';


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
  exportCSV: () => void;
  exportPDF: () => void;
  printReceipt: (id: string) => void;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
}
