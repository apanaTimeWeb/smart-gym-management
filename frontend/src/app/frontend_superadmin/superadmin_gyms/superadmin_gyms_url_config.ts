/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_GYMS_EXTERNAL = {
          WHATSAPP_CLICK_TO_CHAT: (phone: string, message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      } as const;

export const SUPERADMIN_GYMS_ROUTES = {
          MAIN: "/frontend_superadmin/superadmin_gyms",
          BILLING_PLANS: '/superadmin/saas-billing/plans',
          ADD: "/superadmin/gyms/add",
      } as const;

export const SUPERADMIN_GYMS_API = {
          BASE: '/superadmin/gyms',
          IMPERSONATE: '/superadmin/gyms',
          SUBSCRIPTION_PLANS: '/superadmin/saas-billing/plans',
      } as const;

export const SUPERADMIN_GYMS_GHOST_LOGIN = {
          SET_COOKIE_PROXY: '/auth/set-cookie',
          EXIT_GHOST_LOGIN_PROXY: '/auth/exit-ghost-login',
          ADMIN_DASHBOARD: '/admin/dashboard',
      } as const;

export const SUPERADMIN_GYMS_BUSINESS_CONTROLS = { BACKEND_API: { BASE: '/superadmin/gyms/business-controls' } } as const;

export const SUPERADMIN_GYMS_GYM_DETAIL = {
    BACKEND_API: {
        BASE: '/superadmin/gym-detail/business-overview',
        BY_GYM: (gymId: string) => `/superadmin/gym-detail/business-overview?gymId=${encodeURIComponent(gymId)}`,
    },
} as const;

