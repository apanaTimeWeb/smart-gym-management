import { describe, it, expect } from 'vitest';
import { EMPTY_MEMBER_FORM, formatCurrency } from './ManagerMembersSharedConstants';

describe('ManagerMembersSharedConstants', () => {
  it('should format currency correctly', () => {
    // formatCurrency is now centralized in lib/formatters, but testing the re-export
    expect(formatCurrency(1000)).toContain('1,000');
  });

  it('should have empty member form defined', () => {
    expect(EMPTY_MEMBER_FORM).toBeDefined();
    expect(EMPTY_MEMBER_FORM.name).toBe('');
  });
});
