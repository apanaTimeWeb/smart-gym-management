import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';

describe('ManagerMembersFormatters behavioral contract', () => {
  it('ManagerMembersFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerMembersFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerMembersFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerMembersFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerMembersFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerMembersFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerMembersFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerMembersFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerMembersDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerMembersDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerMembersDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerMembersMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerMembersMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerMembersFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerMembersFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerMembersFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerMembersFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
