import { describe, expect, it } from 'vitest';
import { ADMIN_MEMBERS_ROUTES, ADMIN_MEMBERS_API } from '@/app/frontend_admin/admin_members/admin_members_url_config';

describe('Admin members URL configuration', () => {
  it('preserves the selected member identity in the detail route', () => {
    expect(ADMIN_MEMBERS_ROUTES.detail('member/42')).toBe('/admin/members?memberId=member%2F42');
    expect(ADMIN_MEMBERS_API.detail('member/42')).toBe('/admin/members/member%2F42');
  });
});
