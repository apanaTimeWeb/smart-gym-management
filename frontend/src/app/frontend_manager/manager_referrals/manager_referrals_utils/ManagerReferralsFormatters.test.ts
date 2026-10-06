import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_referrals/manager_referrals_utils/ManagerReferralsFormatters';

describe('ManagerReferralsFormatters behavioral contract', () => {
  it('ManagerReferralsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerReferralsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerReferralsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerReferralsFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerReferralsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerReferralsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerReferralsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerReferralsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerReferralsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerReferralsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerReferralsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerReferralsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerReferralsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerReferralsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerReferralsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerReferralsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerReferralsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
