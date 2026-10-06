// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
export const ADMIN_SALES_MEMBERSHIP_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
} as const;

export const ADMIN_SALES_MEMBERSHIP_STATUS_LABEL_KEYS: Record<string, string> = { active: 'sales.admin_sales_all_memberships.status_active', expired: 'sales.admin_sales_all_memberships.status_expired' };

export const ADMIN_SALES_MEMBERSHIP_FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
  EXPIRING_SOON: 'expiring_soon',
  EXPIRED: 'expired',
} as const;


export const ADMIN_SALES_PENDING_PAYMENT_STATUS = { PENDING: 'pending' } as const;

export const ADMIN_SALES_ORDER_STATUS = { PAID: 'paid' } as const;

export const SALES_TABS = [
  'overview',
  'membership_report',
  'pending_payments',
  'all_memberships',
  'store_sales',
] as const;

export const DATE_FILTERS = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;

export const SALES_ITEMS_PER_PAGE = 10;


export const ADMIN_SALES_PAYMENT_MODE_STYLES: Record<string, string> = {
  Cash: 'bg-pay-cash-bg text-pay-cash',
  UPI: 'bg-pay-upi-bg text-pay-upi',
  Card: 'bg-pay-card-bg text-pay-card',
  Bank: 'bg-pay-bank-bg text-pay-bank',
};
