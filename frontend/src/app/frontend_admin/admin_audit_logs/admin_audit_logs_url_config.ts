// admin_audit_logs_url_config.ts
// Owned by: frontend_admin/admin_audit_logs feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_AUDIT_LOGS_ROUTES = {
  root: '/admin/audit_logs' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_AUDIT_LOGS_BASE_URL = '/admin/audit-logs' as const;
export const ADMIN_AUDIT_LOGS_DETAIL_URL = (id: string) => `/admin/audit-logs/${encodeURIComponent(id)}` as const;
export const ADMIN_AUDIT_LOGS_KPIS_URL = '/admin/audit-logs/kpis' as const;
export const ADMIN_AUDIT_LOGS_ACTORS_URL = '/admin/audit-logs/actors' as const;
export const ADMIN_AUDIT_LOGS_EXPORT_URL = '/admin/audit-logs/export' as const;

export const ADMIN_AUDIT_LOGS_URLS = {
  base: ADMIN_AUDIT_LOGS_BASE_URL,
  detail: ADMIN_AUDIT_LOGS_DETAIL_URL,
  kpis: ADMIN_AUDIT_LOGS_KPIS_URL,
  actors: ADMIN_AUDIT_LOGS_ACTORS_URL,
  export: ADMIN_AUDIT_LOGS_EXPORT_URL,
} as const;

export const ADMIN_AUDIT_LOGS_API = ADMIN_AUDIT_LOGS_URLS;
