import { describe, it, expect } from 'vitest';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { EMPTY_MEMBER_FORM } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';


describe('ManagerMembersSharedConstants', () => {
  it('should format currency correctly', () => {
        expect(ManagerMembersFormatCurrency(1000, ManagerEnvConfig.currencyCode)).toContain('10');
  });

  it('should have empty member form defined', () => {
    expect(EMPTY_MEMBER_FORM).toBeDefined();
    expect(EMPTY_MEMBER_FORM.name).toBe('');
  });
});
