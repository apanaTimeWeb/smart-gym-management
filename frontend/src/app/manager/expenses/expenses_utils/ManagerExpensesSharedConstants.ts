// RESPONSIBILITY: Shared constants and form schemas for the Expenses module.

export const EXPENSE_CATEGORIES = [
  'Electricity',
  'Rent',
  'Water Bill',
  'Equipment Maintenance',
  'Salary/Payroll',
  'Marketing',
  'Office Supplies',
  'Miscellaneous'
];

export const EXPENSE_STATUS_LABELS: Record<string, string> = {
  PAID: 'Paid',
  PENDING: 'Pending' };

export const EXPENSE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success-bg', text: 'text-success' },
  PENDING: { bg: 'bg-danger-bg', text: 'text-danger' } };

export const EXPENSES_TABLE_HEADERS = [
  'ID', 'Title', 'Category', 'Amount', 'Date', 'Status', 'Actions'
];
