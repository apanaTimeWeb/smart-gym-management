/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_BROADCASTS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_broadcasts" } as const;

export const SUPERADMIN_BROADCASTS_API = { BASE: "/superadmin/broadcasts", TENANTS: "/superadmin/gyms", DELIVER_TO_RECIPIENT: (broadcastId: string, recipientId: string) => `/superadmin/broadcasts/${encodeURIComponent(broadcastId)}/deliveries/${encodeURIComponent(recipientId)}` } as const;


