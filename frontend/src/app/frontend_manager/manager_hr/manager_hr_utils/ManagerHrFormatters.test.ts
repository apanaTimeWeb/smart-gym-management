import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';

describe('ManagerHrFormatters behavioral contract', () => {
  it('ManagerHrFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerHrFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerHrFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerHrFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerHrFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerHrFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerHrFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerHrFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerHrDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerHrDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerHrDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerHrMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerHrMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerHrFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerHrFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerHrFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerHrFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
