// admin_notifications_url_config.ts
// Owned by: frontend_admin/admin_notifications feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_NOTIFICATIONS_ROUTES = {
  root: '/frontend_admin/admin_notifications' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_NOTIFICATIONS_BASE_URL = '/frontend_admin/admin_notifications' as const;
export const ADMIN_NOTIFICATIONS_MARK_READ_URL = (id: string) => `/admin/notifications/${encodeURIComponent(id)}/read` as const;
export const ADMIN_NOTIFICATIONS_MARK_ALL_READ_URL = '/admin/notifications/read-all' as const;

export const ADMIN_NOTIFICATIONS_URLS = {
  base: ADMIN_NOTIFICATIONS_BASE_URL,
  markRead: ADMIN_NOTIFICATIONS_MARK_READ_URL,
  markAllRead: ADMIN_NOTIFICATIONS_MARK_ALL_READ_URL,
} as const;

export const ADMIN_NOTIFICATIONS_API = ADMIN_NOTIFICATIONS_URLS;
