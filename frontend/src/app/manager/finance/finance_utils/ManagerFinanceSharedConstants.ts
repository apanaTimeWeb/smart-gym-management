// RESPONSIBILITY: Provides UI-safe constants and semantic style maps for Finance.
export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-primary-subtle', text: 'text-primary' },
  Cash: { bg: 'bg-success-bg', text: 'text-success' },
  Card: { bg: 'bg-warning-bg', text: 'text-warning' },
  NetBanking: { bg: 'bg-input', text: 'text-secondary' },
};

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success-bg', text: 'text-success' },
  DUE: { bg: 'bg-danger-bg', text: 'text-danger' },
  REFUNDED: { bg: 'bg-warning-bg', text: 'text-warning' },
};

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'] as const;
export const PAYMENTS_TABLE_HEADERS = ['Invoice No', 'Member', 'Plan', 'Amount', 'Method', 'Status', 'Date', 'Actions'] as const;
export const FINANCE_TABS = ['Payments', 'Summary'] as const;
