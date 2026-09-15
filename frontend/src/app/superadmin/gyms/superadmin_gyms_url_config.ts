export const GymsUrlConfig = {
  PAGES: {
    MAIN: "/superadmin/gyms",
    ADD: "/superadmin/gyms/add",
  },
  BACKEND_API: {
    BASE: "/superadmin/gyms-list",
    IMPERSONATE: "/superadmin/gyms-list",
  },
  /** Ghost-login constants. Owned here so the gyms module does not cross-import /auth. */
  GHOST_LOGIN: {
    SET_COOKIE_PROXY: '/auth/set-cookie',
    ADMIN_DASHBOARD: '/admin/dashboard',
  },
};

