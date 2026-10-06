import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_attendance/manager_attendance_utils/ManagerAttendanceFormatters';

describe('ManagerAttendanceFormatters behavioral contract', () => {
  it('ManagerAttendanceFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerAttendanceFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerAttendanceFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerAttendanceFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerAttendanceFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerAttendanceFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerAttendanceFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerAttendanceFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerAttendanceDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerAttendanceDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerAttendanceDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerAttendanceMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerAttendanceMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerAttendanceFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerAttendanceFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerAttendanceFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerAttendanceFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
