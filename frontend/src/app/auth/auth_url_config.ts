// RESPONSIBILITY: Centralized URL configuration for the Auth module containing all internal routes, external API endpoints, and proxy routes to prevent hardcoded magic strings.
export const AuthUrlConfig = {
  PAGES: {
    LOGIN: '/auth/login',
    DASHBOARD: '/erp/dashboard',
  },
  PROXY_API: {
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    SET_COOKIE: '/api/auth/set-cookie',
    TOKEN: '/api/auth/token',
  },
  BACKEND_API: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  }
};

