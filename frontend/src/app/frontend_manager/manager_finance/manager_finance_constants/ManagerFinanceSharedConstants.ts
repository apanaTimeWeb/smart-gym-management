// RESPONSIBILITY: Provides UI-safe constants and semantic style maps for Finance.
/**
 * @description Provides the ManagerFinanceSharedConstants implementation for the finance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
export const FINANCE_ALL_FILTER = 'ALL' as const;

export const FINANCE_PAYMENT_STATUS_VALUES = ['PAID', 'PENDING', 'REFUNDED', 'PARTIAL'] as const;

export const FINANCE_PENDING_STATUS = ['PENDING'][0] as const;

export const FINANCE_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_STATUS' },
  { value: 'PAID', labelKey: 'COPY_PAID' },
  { value: FINANCE_PENDING_STATUS, labelKey: 'COPY_PENDING' },
  { value: 'REFUNDED', labelKey: 'COPY_REFUNDED' },
] as const;

export const FINANCE_METHOD_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_METHODS' },
  { value: 'UPI', labelKey: 'COPY_UPI' },
  { value: 'Cash', labelKey: 'COPY_CASH' },
  { value: 'Card', labelKey: 'COPY_CARD' },
  { value: 'NetBanking', labelKey: 'COPY_NETBANKING' },
] as const;

export const MANAGER_FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-primary-subtle', text: 'text-primary' },
  Cash: { bg: 'bg-success-bg', text: 'text-success' },
  Card: { bg: 'bg-warning-bg', text: 'text-warning' },
  NetBanking: { bg: 'bg-input', text: 'text-secondary' },
};
