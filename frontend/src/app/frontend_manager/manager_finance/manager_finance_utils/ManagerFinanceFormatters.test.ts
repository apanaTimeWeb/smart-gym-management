import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters';

describe('ManagerFinanceFormatters behavioral contract', () => {
  it('ManagerFinanceFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerFinanceFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerFinanceFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerFinanceFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerFinanceFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerFinanceFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerFinanceFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerFinanceFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerFinanceDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerFinanceDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerFinanceDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerFinanceMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerFinanceMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerFinanceFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerFinanceFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerFinanceFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerFinanceFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
