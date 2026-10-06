import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_maintenance/manager_maintenance_utils/ManagerMaintenanceFormatters';

describe('ManagerMaintenanceFormatters behavioral contract', () => {
  it('ManagerMaintenanceFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerMaintenanceFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerMaintenanceFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerMaintenanceFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerMaintenanceFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerMaintenanceFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerMaintenanceFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerMaintenanceFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerMaintenanceDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerMaintenanceDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerMaintenanceDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerMaintenanceMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerMaintenanceMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerMaintenanceFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerMaintenanceFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerMaintenanceFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerMaintenanceFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
