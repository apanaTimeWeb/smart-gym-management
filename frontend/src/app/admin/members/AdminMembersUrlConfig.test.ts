import { describe, expect, it } from 'vitest';
import { AdminMembersUrlConfig } from '@/app/admin/members/admin_members_url_config';

describe('Admin members URL configuration', () => {
  it('preserves the selected member identity in the detail route', () => {
    expect(AdminMembersUrlConfig.detail('member/42')).toBe('/admin/members?memberId=member%2F42');
    expect(AdminMembersUrlConfig.api.detail('member/42')).toBe('/admin/members/member%2F42');
  });
});
