/** Canonical module-level constant registry for manager_finance; child constant files remain the source of individual entries. */
export const ManagerFinanceConstants = {} as const;

export const MANAGER_FINANCE_PAYMENT_STATUS_PAID = 'PAID' as const;
export const MANAGER_FINANCE_PAYMENT_STATUS_REFUNDED = 'REFUNDED' as const;

export const MANAGER_FINANCE_STATUS_VALUES = {
  PAID: 'PAID',

  ALL: 'ALL',
} as const;
