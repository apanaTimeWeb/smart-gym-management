// admin_blacklist_url_config.ts
// Owned by: frontend_admin/admin_blacklist feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_BLACKLIST_ROUTES = {
  root: '/frontend_admin/admin_blacklist' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_BLACKLIST_BASE_URL = '/frontend_admin/admin_blacklist' as const;
export const ADMIN_BLACKLIST_KPIS_URL = '/admin/blacklist/kpis' as const;
export const ADMIN_BLACKLIST_DETAIL_URL = (id: string) => `/admin/blacklist/${encodeURIComponent(id)}` as const;
export const ADMIN_BLACKLIST_REMOVE_URL = (id: string) => `/admin/blacklist/${encodeURIComponent(id)}/remove` as const;
export const ADMIN_BLACKLIST_PROPAGATE_URL = (id: string) => `/admin/blacklist/${encodeURIComponent(id)}/propagate` as const;

export const ADMIN_BLACKLIST_URLS = {
  base: ADMIN_BLACKLIST_BASE_URL,
  kpis: ADMIN_BLACKLIST_KPIS_URL,
  detail: ADMIN_BLACKLIST_DETAIL_URL,
  remove: ADMIN_BLACKLIST_REMOVE_URL,
  propagate: ADMIN_BLACKLIST_PROPAGATE_URL,
} as const;

export const ADMIN_BLACKLIST_API = ADMIN_BLACKLIST_URLS;
