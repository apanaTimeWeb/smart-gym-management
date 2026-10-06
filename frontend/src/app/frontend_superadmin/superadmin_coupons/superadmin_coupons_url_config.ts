/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_COUPONS_EXTERNAL = {
          WHATSAPP_SHARE: (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`,
      } as const;

export const SUPERADMIN_COUPONS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_coupons" } as const;

export const SUPERADMIN_COUPONS_API = { BASE: "/superadmin/saas-billing/coupons" } as const;

