/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/superadmin/broadcasts" },
      BACKEND_API: { BASE: "/superadmin/broadcasts", TENANTS: "/superadmin/gyms", DELIVER_TO_RECIPIENT: (broadcastId: string, recipientId: string) => `/superadmin/broadcasts/${encodeURIComponent(broadcastId)}/deliveries/${encodeURIComponent(recipientId)}` },
  AUDIENCE_INSIGHTS: { BACKEND_API: { BASE: '/superadmin/broadcasts/audience-insights' } },
} as const;
