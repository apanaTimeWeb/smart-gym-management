/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  EXTERNAL: {
          WHATSAPP_SHARE: (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`,
      },
      PAGES: { MAIN: "/superadmin/saas-billing/coupons" },
      BACKEND_API: { BASE: "/superadmin/saas-billing/coupons" }
} as const;
