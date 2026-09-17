// RESPONSIBILITY: Centralizes Superadmin shell navigation and cross-feature infrastructure routes.
export const SuperadminUrlConfig = {
  PAGES: {
    GYMS: '/superadmin/gyms',
    ADMIN_DASHBOARD: '/admin/dashboard',
  },
  INFRASTRUCTURE: {
    GHOST_LOGIN_EXIT_PROXY: '/auth/exit-ghost-login',
    NOTIFICATIONS_BASE: '/api/v1/superadmin/notifications',
  },
  SHELL_PAGES: {
    MESSAGING: '/superadmin/messaging',
  },
} as const;
