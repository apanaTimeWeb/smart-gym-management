// admin_gym_health_alerts_url_config.ts
// Owned by: frontend_admin/admin_gym_health_alerts feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_GYM_HEALTH_ALERTS_ROUTES = {
  root: '/frontend_admin/admin_gym_health_alerts' as const,
  members: '/frontend_admin/admin_members' as const,
  finance: '/frontend_admin/admin_finance' as const,
  hr: '/frontend_admin/admin_hr' as const,
  attendance: '/frontend_admin/admin_attendance' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_GYM_HEALTH_ALERTS_ALERTS_URL = '/frontend_admin/admin_gym_health_alerts' as const;
export const ADMIN_GYM_HEALTH_ALERTS_SUMMARY_URL = '/admin/gym-health-alerts/summary' as const;
export const ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL = (id: string) => `/admin/gym-health-alerts/${id}/dismiss` as const;

export const ADMIN_GYM_HEALTH_ALERTS_URLS = {
  alerts: ADMIN_GYM_HEALTH_ALERTS_ALERTS_URL,
  summary: ADMIN_GYM_HEALTH_ALERTS_SUMMARY_URL,
  dismiss: ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL,
} as const;

export const ADMIN_GYM_HEALTH_ALERTS_API = ADMIN_GYM_HEALTH_ALERTS_URLS;
