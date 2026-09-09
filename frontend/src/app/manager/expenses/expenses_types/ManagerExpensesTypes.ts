// RESPONSIBILITY: Defines TypeScript interfaces and types for the Expenses module.
// CRITICAL additions: vendorName, paymentMode, approvedBy, isRecurring, recurringFrequency,
// taxAmount, categoryBreakdown — these are DB columns needed before backend is built.

export type ExpenseStatus = 'PAID' | 'PENDING';
export type ExpensePaymentMode = 'Cash' | 'UPI' | 'Card' | 'NetBanking' | 'Cheque' | 'Bank Transfer' | 'Other';
export type RecurringFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
  referenceNo?: string;
  notes?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt?: string;
  // CRITICAL — DB columns missing from original schema
  vendorName?: string;
  paymentMode?: ExpensePaymentMode;
  approvedBy?: string;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency | null;
  taxAmount?: number;
}

export interface ExpenseStats {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  thisMonthAmount: number;
}

/** Used for the category breakdown chart in the Expenses module. */
export interface ExpenseCategoryBreakdown {
  category: string;
  totalAmount: number;
  percentage: number;
  count: number;
}
