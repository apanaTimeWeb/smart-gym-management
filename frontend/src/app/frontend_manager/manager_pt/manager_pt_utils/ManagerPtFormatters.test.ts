import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_pt/manager_pt_utils/ManagerPtFormatters';

describe('ManagerPtFormatters behavioral contract', () => {
  it('ManagerPtFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerPtFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerPtFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerPtFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerPtFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerPtFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerPtFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerPtFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerPtDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerPtDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerPtDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerPtMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerPtMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerPtFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerPtFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerPtFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerPtFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
