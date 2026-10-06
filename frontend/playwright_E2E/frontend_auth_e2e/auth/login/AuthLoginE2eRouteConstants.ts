/**
 * RESPONSIBILITY: Owns the Login E2E route identifiers required by the isolated browser test without importing frontend business modules.
 * DATA FLOW: AuthLogin.spec.ts -> AuthLoginE2eRouteConstants -> browser route navigation/request assertions.
 */

export const AuthLoginE2eRouteConstants = {
  PAGES: {
    LOGIN: '/auth/login',
    SUPERADMIN_DASHBOARD: '/superadmin/dashboard',
    ADMIN_DASHBOARD: '/admin/dashboard',
    MANAGER_DASHBOARD: '/manager/dashboard',
    TRAINER_DASHBOARD: '/trainer/dashboard',
  },
  API: {
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
} as const;
