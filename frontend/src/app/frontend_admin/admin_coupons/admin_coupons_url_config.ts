// admin_coupons_url_config.ts
// Owned by: frontend_admin/admin_coupons feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_COUPONS_ROUTES = {
  root: '/frontend_admin/admin_coupons' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_COUPONS_BASE_URL = '/frontend_admin/admin_coupons' as const;
export const ADMIN_COUPONS_KPIS_URL = '/admin/coupons/kpis' as const;
export const ADMIN_COUPONS_DETAIL_URL = (id: string) => `/admin/coupons/${encodeURIComponent(id)}` as const;
export const ADMIN_COUPONS_TOGGLE_URL = (id: string) => `/admin/coupons/${encodeURIComponent(id)}/toggle` as const;

export const ADMIN_COUPONS_URLS = {
  base: ADMIN_COUPONS_BASE_URL,
  kpis: ADMIN_COUPONS_KPIS_URL,
  detail: ADMIN_COUPONS_DETAIL_URL,
  toggle: ADMIN_COUPONS_TOGGLE_URL,
} as const;

export const ADMIN_COUPONS_API = ADMIN_COUPONS_URLS;
