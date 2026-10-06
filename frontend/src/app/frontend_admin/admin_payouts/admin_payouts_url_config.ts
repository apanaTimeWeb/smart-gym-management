// admin_payouts_url_config.ts
// Owned by: frontend_admin/admin_payouts feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_PAYOUTS_ROUTES = {
  root: '/frontend_admin/admin_payouts' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PAYOUTS_BASE_URL = '/frontend_admin/admin_payouts' as const;
export const ADMIN_PAYOUTS_PNL_URL = '/admin/payouts/pnl' as const;
export const ADMIN_PAYOUTS_KPIS_URL = '/admin/payouts/kpis' as const;
export const ADMIN_PAYOUTS_DETAIL_URL = (id: string) => `/admin/payouts/${encodeURIComponent(id)}` as const;

export const ADMIN_PAYOUTS_URLS = {
  base: ADMIN_PAYOUTS_BASE_URL,
  pnl: ADMIN_PAYOUTS_PNL_URL,
  kpis: ADMIN_PAYOUTS_KPIS_URL,
  detail: ADMIN_PAYOUTS_DETAIL_URL,
} as const;

export const ADMIN_PAYOUTS_API = ADMIN_PAYOUTS_URLS;
