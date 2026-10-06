import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_dashboard/manager_dashboard_utils/ManagerDashboardFormatters';

describe('ManagerDashboardFormatters behavioral contract', () => {
  it('ManagerDashboardFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerDashboardFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerDashboardFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerDashboardFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerDashboardFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerDashboardFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerDashboardFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerDashboardFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerDashboardDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerDashboardDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerDashboardDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerDashboardMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerDashboardMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerDashboardFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerDashboardFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerDashboardFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerDashboardFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
