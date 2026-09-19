// RESPONSIBILITY: Provides the implementation for AdminFinanceSharedConstants.ts functionality within its module.
import { z } from 'zod';

export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
 UPI: { bg: 'bg-primary-subtle', text: 'text-primary' },
 Cash: { bg: 'bg-success', text: 'text-success' },
 Card: { bg: 'bg-warning', text: 'text-warning' },
 NetBanking: { bg: 'bg-input', text: 'text-secondary' },
};

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
 PAID: { bg: 'bg-success', text: 'text-success' },
 DUE: { bg: 'bg-danger', text: 'text-danger' },
 REFUNDED: { bg: 'bg-warning', text: 'text-warning' },
};

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'] as const;
export type FinancePaymentMethod = typeof FINANCE_PAYMENT_METHODS[number];

export const FINANCE_PAYMENT_STATUSES = ['PAID', 'DUE', 'REFUNDED'] as const;
export type FinancePaymentStatus = typeof FINANCE_PAYMENT_STATUSES[number];

export const PAYMENTS_TABLE_HEADERS = ['Invoice No', 'Member', 'Amount', 'Method', 'Status', 'Date'];
export const FINANCE_TABS = ['Payments', 'Expenses', 'Summary'] as const;

export const EXPENSE_CATEGORIES = ['Rent', 'Salaries', 'Utilities', 'Equipment', 'Marketing', 'Maintenance', 'Supplies', 'Other'] as const;

export const FINANCE_ITEMS_PER_PAGE = 10;
