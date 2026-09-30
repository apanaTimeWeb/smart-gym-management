/**
 * RESPONSIBILITY: Centralizes every internal Auth route, backend Auth endpoint, and role redirect target used by Auth.
 * DATA FLOW: Login UI/API and route handlers -> AuthUrlConfig -> concrete route/endpoint destinations.
 */
export const AuthUrlConfig = {
  PAGES: {
    LOGIN: '/frontend_auth/auth/login',
    LANDING: '/landing',
    ADMIN_DASHBOARD: '/admin/dashboard',
    MANAGER_DASHBOARD: '/manager/dashboard',
    TRAINER_DASHBOARD: '/trainer/dashboard',
    SUPERADMIN_DASHBOARD: '/superadmin/dashboard',
  },
  PROXY_API: {
    SESSION: '/frontend_auth/auth/session',
    DEMO_LOGIN: '/frontend_auth/auth/demo-login',
    REFRESH: '/frontend_auth/auth/refresh',
    LOGOUT: '/frontend_auth/auth/logout',
    TOKEN: '/frontend_auth/auth/token',
    EXIT_GHOST_LOGIN: '/frontend_auth/auth/exit-ghost-login',
  },
  BACKEND_API: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
} as const;
