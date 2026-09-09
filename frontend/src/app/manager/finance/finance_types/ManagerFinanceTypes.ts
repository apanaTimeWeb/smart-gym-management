// RESPONSIBILITY: Provides the implementation for ManagerFinanceTypes.ts functionality within its module.
// Includes Indian GST compliance fields: gstAmount, discountAmount, couponCode on Payment,
// and gstCollected, totalRefunds on FinanceSummary.

import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { AddPaymentFormValues } from '@/app/manager/finance/finance_utils/ManagerFinanceSharedConstants';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type PaymentStatus = 'PAID' | 'PENDING' | 'REFUNDED' | 'PARTIAL';
export type PaymentMethod = 'UPI' | 'Cash' | 'Card' | 'NetBanking' | 'Cheque' | 'Other';

export interface FinanceInitialData {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
}

export interface FinanceContextType {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
  fetchState: FetchState;
  saving: boolean;
  error: string;
  toast: { message: string; type: ToastType } | null;
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  showModal: boolean;
  setShowModal: (show: boolean) => boolean | void;
  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  // GST / Date-range filtering (CRITICAL)
  startDate: string;
  endDate: string;
  setDateRange: (start: string, end: string) => void;
  // Export
  exportPayments: (format: 'csv' | 'pdf') => void;
  savePayment: (data: AddPaymentFormValues) => Promise<void>;
}

// ─── Payment ─────────────────────────────────────────────────────────────────
export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  notes?: string;
  invoiceNumber: string;
  receiptNumber?: string;
  taxId?: string;
  paidAt: string;
  // Indian GST compliance fields (CRITICAL — DB columns)
  gstAmount: number;
  discountAmount: number;
  couponCode?: string;
  taxableAmount: number;
  member?: { name: string; email: string; phone: string; plan?: { name: string } };
}

// ─── Finance Summary ──────────────────────────────────────────────────────────
export interface FinanceSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingAmount: number;
  totalPayments: number;
  // Indian GST compliance fields (CRITICAL — DB columns)
  gstCollected: number;
  totalRefunds: number;
  netRevenue: number;
  revenueByMethod: Record<PaymentMethod, number>;
  monthlyData: { month: string; revenue: number; expenses?: number }[];
}
