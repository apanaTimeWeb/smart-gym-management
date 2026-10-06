// admin_permissions_url_config.ts
// Owned by: frontend_admin/admin_permissions feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_PERMISSIONS_ROUTES = {
  root: '/frontend_admin/admin_permissions' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PERMISSIONS_PERMISSIONS_URL = '/frontend_admin/admin_permissions' as const;
export const ADMIN_PERMISSIONS_OVERRIDES_URL = '/admin/permissions/overrides' as const;
export const ADMIN_PERMISSIONS_STAFF_URL = (staffId: string) => `/admin/permissions/${staffId}` as const;
export const ADMIN_PERMISSIONS_RESET_URL = (staffId: string) => `/admin/permissions/${staffId}/reset` as const;

export const ADMIN_PERMISSIONS_URLS = {
  permissions: ADMIN_PERMISSIONS_PERMISSIONS_URL,
  overrides: ADMIN_PERMISSIONS_OVERRIDES_URL,
  staff: ADMIN_PERMISSIONS_STAFF_URL,
  reset: ADMIN_PERMISSIONS_RESET_URL,
} as const;

export const ADMIN_PERMISSIONS_API = ADMIN_PERMISSIONS_URLS;
