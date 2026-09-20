import { describe, expect, it } from 'vitest';
import { EXPENSE_CATEGORIES, EXPENSES_TABLE_HEADERS, EXPENSE_STATUS_LABELS, EXPENSE_STATUS_STYLES } from '@/app/manager/expenses/expenses_utils/ManagerExpensesSharedConstants';


describe('ManagerExpensesSharedConstants', () => {
  it('exposes the documented expense categories', () => {
    expect(EXPENSE_CATEGORIES).toContain('Rent');
    expect(EXPENSE_CATEGORIES).toContain('Salary/Payroll');
  });

  it('keeps statuses and table columns aligned', () => {
    expect(EXPENSE_STATUS_LABELS.PAID).toBe('Paid');
    expect(EXPENSE_STATUS_STYLES.PENDING?.text).toBe('text-danger');
    expect(EXPENSES_TABLE_HEADERS).toEqual(['ID', 'Title', 'Category', 'Amount', 'Date', 'Status', 'Actions']);
  });
});
