// admin_branches_url_config.ts
// Owned by: frontend_admin/admin_branches feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_BRANCHES_ROUTES = {
  root: '/admin/branches' as const,
  dashboard: '/admin/dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_BRANCHES_BASE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_BRANCHES_DETAIL_URL = (branchId: string) => `/admin/branches/${encodeURIComponent(branchId)}` as const;

export const ADMIN_BRANCHES_URLS = {
  base: ADMIN_BRANCHES_BASE_URL,
  detail: ADMIN_BRANCHES_DETAIL_URL,
} as const;

export const ADMIN_BRANCHES_API = ADMIN_BRANCHES_URLS;
