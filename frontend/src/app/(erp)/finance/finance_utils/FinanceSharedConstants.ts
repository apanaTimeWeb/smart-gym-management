export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
 UPI: { bg: 'var(--finance-method-upi-bg)', text: 'var(--finance-method-upi-text)' },
 Cash: { bg: 'var(--finance-method-cash-bg)', text: 'var(--finance-method-cash-text)' },
 Card: { bg: 'var(--finance-method-card-bg)', text: 'var(--finance-method-card-text)' },
 NetBanking: { bg: 'var(--finance-method-netbanking-bg)', text: 'var(--finance-method-netbanking-text)' },
};

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
 PAID: { bg: 'var(--finance-status-paid-bg)', text: 'var(--finance-status-paid-text)' },
 DUE: { bg: 'var(--finance-status-due-bg)', text: 'var(--finance-status-due-text)' },
 REFUNDED: { bg: 'var(--finance-status-refunded-bg)', text: 'var(--finance-status-refunded-text)' },
};

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'];

export const PAYMENTS_TABLE_HEADERS = ['Invoice No', 'Member', 'Amount', 'Method', 'Status', 'Date'];

export const FINANCE_TABS = ['Payments', 'Summary'];
