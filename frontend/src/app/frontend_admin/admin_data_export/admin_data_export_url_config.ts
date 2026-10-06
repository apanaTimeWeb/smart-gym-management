// admin_data_export_url_config.ts
// Owned by: frontend_admin/admin_data_export feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_DATA_EXPORT_ROUTES = {
  root: '/frontend_admin/admin_data_export' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_DATA_EXPORT_API = {
} as const;

// Canonical module URL registry. Backend endpoints remain intentionally empty until an authoritative contract is supplied.
export const ADMIN_DATA_EXPORT_URLS = {
  ROUTES: ADMIN_DATA_EXPORT_ROUTES,
  API: ADMIN_DATA_EXPORT_API,
} as const;
