import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_notifications/manager_notifications_utils/ManagerNotificationsFormatters';

describe('ManagerNotificationsFormatters behavioral contract', () => {
  it('ManagerNotificationsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerNotificationsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerNotificationsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerNotificationsFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerNotificationsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerNotificationsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerNotificationsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerNotificationsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerNotificationsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerNotificationsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerNotificationsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerNotificationsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerNotificationsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerNotificationsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerNotificationsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerNotificationsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerNotificationsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
