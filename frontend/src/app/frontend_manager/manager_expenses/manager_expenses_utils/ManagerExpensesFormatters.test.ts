import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_expenses/manager_expenses_utils/ManagerExpensesFormatters';

describe('ManagerExpensesFormatters behavioral contract', () => {
  it('ManagerExpensesFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerExpensesFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerExpensesFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerExpensesFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerExpensesFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerExpensesFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerExpensesFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerExpensesFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerExpensesDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerExpensesDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerExpensesDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerExpensesMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerExpensesMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerExpensesFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerExpensesFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerExpensesFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerExpensesFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
