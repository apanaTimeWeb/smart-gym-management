// admin_usage_url_config.ts
// Owned by: frontend_admin/admin_usage feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_USAGE_ROUTES = {
  root: '/frontend_admin/admin_usage' as const,
  subscriptions: '/frontend_admin/admin_subscriptions' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_USAGE_MY_USAGE_URL = '/frontend_admin/admin_usage' as const;
export const ADMIN_USAGE_UPGRADE_REQUEST_URL = '/admin/usage/upgrade-request' as const;

export const ADMIN_USAGE_URLS = {
  myUsage: ADMIN_USAGE_MY_USAGE_URL,
  upgradeRequest: ADMIN_USAGE_UPGRADE_REQUEST_URL,
} as const;

export const ADMIN_USAGE_API = ADMIN_USAGE_URLS;
