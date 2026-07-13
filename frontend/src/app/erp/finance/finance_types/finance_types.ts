// RESPONSIBILITY: Provides the implementation for finance_types.ts functionality within its module.

import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { AddPaymentFormValues } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';

export interface FinanceInitialData {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
}

export interface FinanceContextType {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
 loading: boolean;
 error: string;
 toast: { message: string; type: ToastType } | null;
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 loadAll: () => Promise<void>;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  savePayment: (data: AddPaymentFormValues) => Promise<void>;
}

export interface Payment {
  id: number; memberId: number; amount: number; method: string;
  status: string; notes?: string; invoiceNo: string; paidAt: string;
  member?: { name: string; email: string; phone: string; plan?: { name: string } };
}
export interface FinanceSummary {
  totalRevenue: number; monthlyRevenue: number; pendingAmount: number;
  totalPayments: number;
  revenueByMethod: { UPI: number; Cash: number; Card: number; NetBanking: number };
  monthlyData: { month: string; revenue: number }[];
}
