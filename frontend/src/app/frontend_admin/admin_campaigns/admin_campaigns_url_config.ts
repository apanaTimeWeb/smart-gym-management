// admin_campaigns_url_config.ts
// Owned by: frontend_admin/admin_campaigns feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_CAMPAIGNS_ROUTES = {
  root: '/admin/campaigns' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_CAMPAIGNS_AUDIENCES_URL = '/admin/campaigns/audiences' as const;
export const ADMIN_CAMPAIGNS_TEMPLATES_URL = '/admin/campaigns/templates' as const;
export const ADMIN_CAMPAIGNS_RECIPIENTS_URL = '/admin/campaigns/recipients' as const;

export const ADMIN_CAMPAIGNS_URLS = {
  audiences: ADMIN_CAMPAIGNS_AUDIENCES_URL,
  templates: ADMIN_CAMPAIGNS_TEMPLATES_URL,
  recipients: ADMIN_CAMPAIGNS_RECIPIENTS_URL,
} as const;

export const ADMIN_CAMPAIGNS_API = ADMIN_CAMPAIGNS_URLS;

export const ADMIN_CAMPAIGNS_WHATSAPP_WEB_URL = 'https://wa.me' as const;
export const ADMIN_CAMPAIGNS_EXTERNAL_URLS = { whatsappWeb: ADMIN_CAMPAIGNS_WHATSAPP_WEB_URL } as const;
