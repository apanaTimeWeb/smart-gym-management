import { describe, expect, it } from 'vitest';
import { ManagerLibraryDisplayValue } from '@/app/frontend_manager/manager_library/manager_library_utils/ManagerLibraryFormatters';

describe('ManagerLibraryDisplayValue', () => {
  it('uses an en-dash for missing values', () => {
    expect(ManagerLibraryDisplayValue(null)).toBe('—');
    expect(ManagerLibraryDisplayValue(undefined)).toBe('—');
    expect(ManagerLibraryDisplayValue('')).toBe('—');
  });

  it('preserves meaningful primitive values', () => {
    expect(ManagerLibraryDisplayValue(0)).toBe('0');
    expect(ManagerLibraryDisplayValue(false)).toBe('false');
    expect(ManagerLibraryDisplayValue('Beginner')).toBe('Beginner');
  });
});
