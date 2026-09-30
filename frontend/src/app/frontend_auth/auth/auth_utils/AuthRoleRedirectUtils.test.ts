import { describe, expect, it } from 'vitest';
import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthRoleRedirectUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRoleRedirectUtils';
describe('AuthRoleRedirectUtils', () => {
  it('maps every supported role to its documented dashboard route', () => {
    expect(AuthRoleRedirectUtils.getDashboardRoute(AuthRoleConstants.SUPERADMIN)).toBe(AuthUrlConfig.PAGES.SUPERADMIN_DASHBOARD);
    expect(AuthRoleRedirectUtils.getDashboardRoute(AuthRoleConstants.ADMIN)).toBe(AuthUrlConfig.PAGES.ADMIN_DASHBOARD);
    expect(AuthRoleRedirectUtils.getDashboardRoute(AuthRoleConstants.MANAGER)).toBe(AuthUrlConfig.PAGES.MANAGER_DASHBOARD);
    expect(AuthRoleRedirectUtils.getDashboardRoute(AuthRoleConstants.TRAINER)).toBe(AuthUrlConfig.PAGES.TRAINER_DASHBOARD);
  });
});
