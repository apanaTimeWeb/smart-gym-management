import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_inquiries/manager_inquiries_utils/ManagerInquiriesFormatters';

describe('ManagerInquiriesFormatters behavioral contract', () => {
  it('ManagerInquiriesFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerInquiriesFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerInquiriesFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerInquiriesFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerInquiriesFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerInquiriesFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerInquiriesFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerInquiriesFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerInquiriesDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerInquiriesDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerInquiriesDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerInquiriesMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerInquiriesMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerInquiriesFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerInquiriesFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerInquiriesFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerInquiriesFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
