/**
 * RESPONSIBILITY: Centralizes every internal Auth route, backend Auth endpoint, and role redirect target used by this module.
 * DATA FLOW: Login UI/API and Auth route handlers consume this configuration instead of embedding URL strings at call sites.
 */
export const AuthUrlConfig = {
  PAGES: {
    LOGIN: '/auth/login',
    LANDING: '/landing',
    ADMIN_DASHBOARD: '/admin/dashboard',
    MANAGER_DASHBOARD: '/manager/dashboard',
    TRAINER_DASHBOARD: '/trainer/dashboard',
    SUPERADMIN_DASHBOARD: '/superadmin/dashboard',
  },
  PROXY_API: {
    SESSION: '/auth/session',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    TOKEN: '/auth/token',
    EXIT_GHOST_LOGIN: '/auth/exit-ghost-login',
  },
  BACKEND_API: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
} as const;
