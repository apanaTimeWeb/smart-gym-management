/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_MESSAGING_ROUTES = { MAIN: "/frontend_superadmin/superadmin_messaging" } as const;

export const SUPERADMIN_MESSAGING_WHATSAPP_CLICK_TO_CHAT_BASE = 'https://wa.me' as const;

export const SUPERADMIN_MESSAGING_WHATSAPP_BASE = '/superadmin/messaging/whatsapp' as const;

export const SUPERADMIN_MESSAGING_API = {
  BASE: "/superadmin/messaging",
  WHATSAPP_BULK_CENTER: "/superadmin/messaging/whatsapp/bulk-center",
  WHATSAPP_CAMPAIGNS: "/superadmin/messaging/whatsapp/campaigns",
} as const;

