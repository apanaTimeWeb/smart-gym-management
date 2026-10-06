/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_TICKETS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_tickets", GYMS: "/frontend_superadmin/superadmin_gyms" } as const;

export const SUPERADMIN_TICKETS_API = {
          BASE: "/superadmin/tickets",
          REPLY: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/reply`,
          CLOSE: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/close`,
          ASSIGN: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/assign`,
      } as const;


