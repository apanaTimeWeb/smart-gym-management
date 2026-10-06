// admin_announcements_url_config.ts
// Owned by: frontend_admin/admin_announcements feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_ANNOUNCEMENTS_ROUTES = {
  root: '/admin/announcements' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_ANNOUNCEMENTS_BASE_URL = '/admin/announcements' as const;
export const ADMIN_ANNOUNCEMENTS_KPIS_URL = '/admin/announcements/kpis' as const;
export const ADMIN_ANNOUNCEMENTS_DETAIL_URL = (id: string) => `/admin/announcements/${encodeURIComponent(id)}` as const;
export const ADMIN_ANNOUNCEMENTS_PIN_URL = (id: string) => `/admin/announcements/${encodeURIComponent(id)}/pin` as const;

export const ADMIN_ANNOUNCEMENTS_URLS = {
  base: ADMIN_ANNOUNCEMENTS_BASE_URL,
  kpis: ADMIN_ANNOUNCEMENTS_KPIS_URL,
  detail: ADMIN_ANNOUNCEMENTS_DETAIL_URL,
  pin: ADMIN_ANNOUNCEMENTS_PIN_URL,
} as const;

export const ADMIN_ANNOUNCEMENTS_API = ADMIN_ANNOUNCEMENTS_URLS;
