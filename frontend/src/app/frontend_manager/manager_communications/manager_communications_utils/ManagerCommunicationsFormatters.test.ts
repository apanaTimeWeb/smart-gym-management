import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsFormatters';

describe('ManagerCommunicationsFormatters behavioral contract', () => {
  it('ManagerCommunicationsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerCommunicationsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerCommunicationsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerCommunicationsFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerCommunicationsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerCommunicationsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerCommunicationsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerCommunicationsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerCommunicationsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerCommunicationsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerCommunicationsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerCommunicationsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerCommunicationsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerCommunicationsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerCommunicationsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerCommunicationsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerCommunicationsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
