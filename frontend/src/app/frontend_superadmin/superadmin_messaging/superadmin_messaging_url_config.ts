/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/frontend_superadmin/superadmin_messaging" },
      WHATSAPP_CLICK_TO_CHAT_BASE: 'https://wa.me',
          WHATSAPP_BASE: '/superadmin/messaging/whatsapp',
      BACKEND_API: {
          BASE: "/superadmin/messaging",
          WHATSAPP_BULK_CENTER: "/superadmin/messaging/whatsapp/bulk-center",
          WHATSAPP_CAMPAIGNS: "/superadmin/messaging/whatsapp/campaigns",
      },
  TEMPLATE_INSIGHTS: { BACKEND_API: { BASE: '/superadmin/messaging/template-insights' } },
} as const;
