import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_store/manager_store_utils/ManagerStoreFormatters';

describe('ManagerStoreFormatters behavioral contract', () => {
  it('ManagerStoreFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerStoreFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerStoreFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerStoreFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerStoreFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerStoreFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerStoreFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerStoreFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerStoreDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerStoreDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerStoreDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerStoreMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerStoreMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerStoreFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerStoreFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerStoreFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerStoreFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
