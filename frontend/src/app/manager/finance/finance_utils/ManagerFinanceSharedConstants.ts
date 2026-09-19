// RESPONSIBILITY: Provides UI-safe constants and semantic style maps for Finance.
export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-primary/10', text: 'text-primary' },
  Cash: { bg: 'bg-success/10', text: 'text-success' },
  Card: { bg: 'bg-warning/10', text: 'text-warning' },
  NetBanking: { bg: 'bg-secondary/10', text: 'text-secondary' },
};

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success/10', text: 'text-success' },
  DUE: { bg: 'bg-danger/10', text: 'text-danger' },
  REFUNDED: { bg: 'bg-warning/10', text: 'text-warning' },
};

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'] as const;
export const PAYMENTS_TABLE_HEADERS = ['Invoice No', 'Member', 'Plan', 'Amount', 'Method', 'Status', 'Date', 'Actions'] as const;
export const FINANCE_TABS = ['Payments', 'Summary'] as const;
