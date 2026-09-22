import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { EMPTY_MEMBER_FORM } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { useLocale } from "next-intl";

describe('ManagerMembersSharedConstants', () => {
    const locale = useLocale();
  it('should format currency correctly', () => {
        expect(formatCurrency(1000, ManagerEnvConfig.currencyCode, locale)).toContain('1,000');
  });

  it('should have empty member form defined', () => {
    expect(EMPTY_MEMBER_FORM).toBeDefined();
    expect(EMPTY_MEMBER_FORM.name).toBe('');
  });
});
