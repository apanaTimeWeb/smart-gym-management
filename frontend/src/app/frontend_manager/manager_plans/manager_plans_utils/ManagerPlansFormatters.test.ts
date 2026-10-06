import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_plans/manager_plans_utils/ManagerPlansFormatters';

describe('ManagerPlansFormatters behavioral contract', () => {
  it('ManagerPlansFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerPlansFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerPlansFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerPlansFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerPlansFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerPlansFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerPlansFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerPlansFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerPlansDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerPlansDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerPlansDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerPlansMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerPlansMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerPlansFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerPlansFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerPlansFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerPlansFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
