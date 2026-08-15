// RESPONSIBILITY: Centralized URL configuration for the Auth module containing all internal routes, external API endpoints, and proxy routes to prevent hardcoded magic strings.
export const AuthUrlConfig = {
  PAGES: {
    LOGIN: '/auth/login',
    DASHBOARD: '/erp/dashboard',
  },
  PROXY_API: {
    REFRESH: '/next-api/auth/refresh',
    LOGOUT: '/next-api/auth/logout',
    SET_COOKIE: '/next-api/auth/set-cookie',
    TOKEN: '/next-api/auth/token',
  },
  BACKEND_API: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  }
};

