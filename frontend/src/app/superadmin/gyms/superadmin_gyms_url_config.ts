export const GymsUrlConfig = {
    PAGES: {
        MAIN: "/superadmin/gyms",
        ADD: "/superadmin/gyms/add",
    },
    BACKEND_API: {
        BASE: '/api/gyms',
        IMPERSONATE: '/api/gyms',
        SUBSCRIPTION_PLANS: '/superadmin/saas-billing/plans',
    },
    /** Ghost-login constants. Owned here so the gyms module does not cross-import /auth. */
    GHOST_LOGIN: {
        SET_COOKIE_PROXY: '/auth/set-cookie',
        EXIT_GHOST_LOGIN_PROXY: '/auth/exit-ghost-login',
        ADMIN_DASHBOARD: '/admin/dashboard',
    },
};
