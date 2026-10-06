/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_INVOICES_EXTERNAL = {
          WHATSAPP_SHARE: (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`,
      } as const;

export const SUPERADMIN_INVOICES_ROUTES = { MAIN: "/frontend_superadmin/superadmin_invoices" } as const;

export const SUPERADMIN_INVOICES_API = {
          BASE: "/superadmin/saas-billing/invoices",
          MANUAL_PAYMENT: "/superadmin/saas-billing/invoices/manual-payment",
          TENANTS: "/superadmin/gyms"
      } as const;

export const SUPERADMIN_INVOICES_RECOVERY_CENTER = { BACKEND_API: { BASE: '/superadmin/saas-billing/invoices/recovery-center' } } as const;

