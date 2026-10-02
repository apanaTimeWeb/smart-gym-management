/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/frontend_superadmin/superadmin_tickets", GYMS: "/frontend_superadmin/superadmin_gyms" },
      BACKEND_API: {
          BASE: "/superadmin/tickets",
          REPLY: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/reply`,
          CLOSE: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/close`,
          ASSIGN: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/assign`,
      },
  SERVICE_INSIGHTS: { BACKEND_API: { BASE: '/superadmin/tickets/service-insights' } },
} as const;
