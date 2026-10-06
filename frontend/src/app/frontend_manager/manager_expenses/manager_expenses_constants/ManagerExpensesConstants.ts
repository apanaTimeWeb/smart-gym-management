/** Canonical module-level constant registry for manager_expenses; child constant files remain the source of individual entries. */
export const ManagerExpensesConstants = {} as const;

export const MANAGER_EXPENSE_STATUS_PAID = 'PAID' as const;

export const MANAGER_EXPENSES_STATUS_VALUES = {
  PENDING: 'PENDING',
  ALL: 'All',
  PAID: 'PAID',
} as const;
