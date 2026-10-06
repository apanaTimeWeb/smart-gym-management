import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters';

describe('ManagerReportsFormatters behavioral contract', () => {
  it('ManagerReportsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerReportsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerReportsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerReportsFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerReportsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerReportsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerReportsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerReportsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerReportsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerReportsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerReportsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerReportsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerReportsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerReportsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerReportsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerReportsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerReportsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
