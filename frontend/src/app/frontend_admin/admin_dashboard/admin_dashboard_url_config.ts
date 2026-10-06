// admin_dashboard_url_config.ts
// Owned by: frontend_admin/admin_dashboard feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_DASHBOARD_ROUTES = {
  root: '/admin/dashboard' as const,
  auditLogs: '/admin/audit_logs' as const,
  members: '/admin/members' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_DASHBOARD_BASE_URL = '/admin/dashboard' as const;
export const ADMIN_DASHBOARD_STATS_URL = '/admin/dashboard/fetchDashboardStats' as const;

export const ADMIN_DASHBOARD_URLS = {
  base: ADMIN_DASHBOARD_BASE_URL,
  stats: ADMIN_DASHBOARD_STATS_URL,
} as const;

export const ADMIN_DASHBOARD_API = ADMIN_DASHBOARD_URLS;
