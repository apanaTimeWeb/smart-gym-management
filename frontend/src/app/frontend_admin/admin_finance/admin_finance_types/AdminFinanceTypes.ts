// RESPONSIBILITY: Provides the implementation for AdminFinanceTypes.ts functionality within its module.
import type { QueryStatus } from '@tanstack/react-query';
import { FINANCE_PAYMENT_STATUSES, FINANCE_PNL_STATUS_FILTERS, FINANCE_BRANCH_PNL_STATUSES } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';


export type AdminFinanceExpenseUrlParamKey = 'expenseCategory' | 'expensePage';
export type AdminFinancePaymentMode = 'CASH' | 'UPI' | 'CARD' | 'ONLINE';
export type AdminFinancePaymentType = 'PAYMENT' | 'REFUND' | 'ADJUSTMENT';
export type FinancePaymentMethod = 'UPI' | 'Cash' | 'Card' | 'NetBanking';
export type FinancePaymentStatus = typeof FINANCE_PAYMENT_STATUSES[number];
export interface PnlPeriodOption { value: PnlPeriod; label: string; }


export interface FinanceInitialData {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
}

export interface FinanceContextType {
  payments: Payment[];
  totalPayments: number;
  summary: FinanceSummary | null;
  status: QueryStatus;
  error: string;
  loadAll: () => Promise<void>;
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  methodFilter: string;
  setMethodFilter: (method: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export interface Payment {
  id: string; 
  memberId: string; 
  amount: number; 
  method: string;
  paymentMode?: AdminFinancePaymentMode;
  gstAmount?: number;
  taxRate?: number;
  invoiceNumber?: string;
  hsn_code?: string;
  planId?: string;
  type?: AdminFinancePaymentType;
  status: string; 
  notes?: string; 
  invoiceNo: string; 
  paidAt: string;
  member?: { name: string; email: string; phone: string; plan?: { name: string } };
  refundReason?: string;
  receiptNumber?: string;
  discountApplied?: number;
  couponCode?: string;
}
export interface FinanceSummary {
  totalRevenue: number; monthlyRevenue: number; pendingAmount: number;
  totalPayments: number;
  totalExpenses: number;
  netProfit: number;
  revenueByMethod: { UPI: number; Cash: number; Card: number; NetBanking: number };
  monthlyData: { month: string; revenue: number }[];
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  branchId: string;
  branchName?: string;
  date: string;
  notes?: string;
  recordedBy: string;
  vendor?: string;
  billNumber?: string;
  approvedBy?: string;
  receiptUrl?: string;
}

// ─── Branch P&L Types ──────────────────────────────────────────────────────────

export type PnlPeriod = 'THIS_MONTH' | 'LAST_MONTH' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'THIS_YEAR';

export type PnlStatusFilter = typeof FINANCE_PNL_STATUS_FILTERS[keyof typeof FINANCE_PNL_STATUS_FILTERS];

export type PnlSortKey = 'branchName' | 'revenue' | 'expenses' | 'netProfit' | 'marginPct';

export type PnlSortDirection = 'asc' | 'desc';

export type BranchPnlStatus = typeof FINANCE_BRANCH_PNL_STATUSES[keyof typeof FINANCE_BRANCH_PNL_STATUSES];

export interface BranchRevenueBreakdown {
  memberships: number;
  ptSessions: number;
  products: number;
  other: number;
}

export interface BranchExpenseBreakdown {
  rent: number;
  salaries: number;
  utilities: number;
  maintenance: number;
  marketing: number;
}

export interface BranchPnlRecord {
  branchId: string;
  branchName: string;
  location: string;
  revenue: number;
  expenses: number;
  netProfit: number;
  marginPct: number;
  status: BranchPnlStatus;
  momDelta: number; // month-over-month % change in net profit
  revenueBreakdown: BranchRevenueBreakdown;
  expenseBreakdown: BranchExpenseBreakdown;
}

export interface BranchPnlAggregates {
  totalRevenue: number;
  totalExpenses: number;
  totalNetProfit: number;
  overallMarginPct: number;
  profitableBranches: number;
  lossMakingBranches: number;
}
