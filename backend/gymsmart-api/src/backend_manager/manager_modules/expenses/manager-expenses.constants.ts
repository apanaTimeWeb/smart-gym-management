// RESPONSIBILITY: Centralized runtime enum/configuration for Manager expenses.
// FLOW: DTO/entity/query allowlists -> Expenses feature behavior.

export enum ExpenseStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
}

export enum ExpensePaymentMode {
  CASH = 'CASH',
  CARD = 'CARD',
  UPI = 'UPI',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum RecurringFrequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

export enum ExpensesRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const ExpensesAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
