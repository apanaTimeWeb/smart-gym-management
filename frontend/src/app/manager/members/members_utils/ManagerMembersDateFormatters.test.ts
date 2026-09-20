import { describe, expect, it } from 'vitest';
import { formatMemberMonthYear } from '@/app/manager/members/members_utils/ManagerMembersDateFormatters';


describe('ManagerMembersDateFormatters', () => {
  it('formats membership month/year consistently', () => {
    expect(formatMemberMonthYear('2026-02-15')).toMatch(/February/i);
    expect(formatMemberMonthYear('2026-02-15')).toMatch(/2026/);
  });
});
