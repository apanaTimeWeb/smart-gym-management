import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { describe, it, expect } from 'vitest';
import { EMPTY_MEMBER_FORM } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';

describe('ManagerMembersSharedConstants', () => {
  it('should format currency correctly', () => {
        expect(formatCurrencyFromMinorUnits(1000, ManagerEnvConfig.currencyCode)).toContain('1,000');
  });

  it('should have empty member form defined', () => {
    expect(EMPTY_MEMBER_FORM).toBeDefined();
    expect(EMPTY_MEMBER_FORM.name).toBe('');
  });
});
