/**
 * RESPONSIBILITY: Resolves validated Auth roles to the only documented post-authentication destinations.
 * DATA FLOW: AuthUser.role -> AuthRoleRedirectUtils -> AuthUrlConfig dashboard destination.
 * @edge-case Unknown roles return null so callers can keep the user on the public Login route instead of inventing a destination.
 */
import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import type { AuthRole } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

export const AuthRoleRedirectUtils = {
  /** Maps an Auth role to its documented dashboard route. */
  getDashboardRoute(role: AuthRole): string | null {
    switch (role) {
      case AuthRoleConstants.SUPERADMIN:
        return AuthUrlConfig.PAGES.SUPERADMIN_DASHBOARD;
      case AuthRoleConstants.ADMIN:
        return AuthUrlConfig.PAGES.ADMIN_DASHBOARD;
      case AuthRoleConstants.MANAGER:
        return AuthUrlConfig.PAGES.MANAGER_DASHBOARD;
      case AuthRoleConstants.TRAINER:
        return AuthUrlConfig.PAGES.TRAINER_DASHBOARD;
      default:
        return null;
    }
  },
} as const;
