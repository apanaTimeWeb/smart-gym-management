// RESPONSIBILITY: Owns every route path used by the Manager dashboard module.
/**
 * @description Canonical Manager dashboard URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_DASHBOARD_PAGES_HOME_URL = '/frontend_manager/manager_dashboard';
export const MANAGER_DASHBOARD_BACKEND_API_STATS_URL = '/frontend_manager/manager_dashboard/stats';
export const MANAGER_DASHBOARD_BACKEND_API_CHARTS_URL = '/frontend_manager/manager_dashboard/charts';
export const MANAGER_DASHBOARD_BACKEND_API_RECENT_URL = '/frontend_manager/manager_dashboard/recent';

export const MANAGER_DASHBOARD_URLS = {
  PAGES: {
    HOME: MANAGER_DASHBOARD_PAGES_HOME_URL
  },
  BACKEND_API: {
    STATS: MANAGER_DASHBOARD_BACKEND_API_STATS_URL,
    CHARTS: MANAGER_DASHBOARD_BACKEND_API_CHARTS_URL,
    RECENT: MANAGER_DASHBOARD_BACKEND_API_RECENT_URL
  }
} as const;

export const ManagerDashboardUrlConfig = MANAGER_DASHBOARD_URLS;
