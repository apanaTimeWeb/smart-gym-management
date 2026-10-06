import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_grievance/manager_grievance_utils/ManagerGrievanceFormatters';

describe('ManagerGrievanceFormatters behavioral contract', () => {
  it('ManagerGrievanceFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerGrievanceFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerGrievanceFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerGrievanceFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerGrievanceFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerGrievanceFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerGrievanceFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerGrievanceFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerGrievanceDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerGrievanceDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerGrievanceDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerGrievanceMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerGrievanceMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerGrievanceFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerGrievanceFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerGrievanceFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerGrievanceFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
