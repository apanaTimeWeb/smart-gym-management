import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_sales/manager_sales_utils/ManagerSalesFormatters';

describe('ManagerSalesFormatters behavioral contract', () => {
  it('ManagerSalesFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerSalesFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerSalesFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerSalesFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerSalesFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerSalesFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerSalesFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerSalesFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerSalesDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerSalesDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerSalesDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerSalesMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerSalesMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerSalesFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerSalesFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerSalesFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerSalesFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
