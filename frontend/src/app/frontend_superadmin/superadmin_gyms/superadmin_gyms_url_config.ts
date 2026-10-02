/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  EXTERNAL: {
          WHATSAPP_CLICK_TO_CHAT: (phone: string, message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      },
      PAGES: {
          MAIN: "/frontend_superadmin/superadmin_gyms",
          BILLING_PLANS: '/superadmin/saas-billing/plans',
          ADD: "/superadmin/gyms/add",
      },
      BACKEND_API: {
          BASE: '/superadmin/gyms',
          IMPERSONATE: '/superadmin/gyms',
          SUBSCRIPTION_PLANS: '/superadmin/saas-billing/plans',
      },
      /** Ghost-login constants. Owned here so the gyms module does not cross-import /auth. */
      GHOST_LOGIN: {
          SET_COOKIE_PROXY: '/auth/set-cookie',
          EXIT_GHOST_LOGIN_PROXY: '/auth/exit-ghost-login',
          ADMIN_DASHBOARD: '/admin/dashboard',
      },
  BUSINESS_CONTROLS: { BACKEND_API: { BASE: '/superadmin/gyms/business-controls' } },
  GYM_DETAIL: {
    BACKEND_API: {
        BASE: '/superadmin/gym-detail/business-overview',
        BY_GYM: (gymId: string) => `/superadmin/gym-detail/business-overview?gymId=${encodeURIComponent(gymId)}`,
    },
},
} as const;
