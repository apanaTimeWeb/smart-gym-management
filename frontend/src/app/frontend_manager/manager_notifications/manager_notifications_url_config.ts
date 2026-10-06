// RESPONSIBILITY: Owns every route path used by the Manager notifications module.
/**
 * @description Canonical Manager notifications URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_NOTIFICATIONS_UI_PAGE_HOME_URL = '/frontend_manager/manager_notifications';
export const MANAGER_NOTIFICATIONS_BACKEND_API_BASE_URL = '/frontend_manager/manager_notifications';
export const MANAGER_NOTIFICATIONS_BACKEND_API_STATS_URL = '/frontend_manager/manager_notifications/stats';
export const MANAGER_NOTIFICATIONS_BACKEND_API_MARK_READ_URL = (id: string) => `/frontend_manager/manager_notifications/${id}/read`;
export const MANAGER_NOTIFICATIONS_BACKEND_API_MARK_ALL_READ_URL = '/frontend_manager/manager_notifications/read-all';
export const MANAGER_NOTIFICATIONS_BACKEND_API_DELETE_URL = (id: string) => `/frontend_manager/manager_notifications/${id}`;

export const MANAGER_NOTIFICATIONS_URLS = {
  UI: {
    HOME: MANAGER_NOTIFICATIONS_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_NOTIFICATIONS_BACKEND_API_BASE_URL,
    STATS: MANAGER_NOTIFICATIONS_BACKEND_API_STATS_URL,
    MARK_READ: MANAGER_NOTIFICATIONS_BACKEND_API_MARK_READ_URL,
    MARK_ALL_READ: MANAGER_NOTIFICATIONS_BACKEND_API_MARK_ALL_READ_URL,
    DELETE: MANAGER_NOTIFICATIONS_BACKEND_API_DELETE_URL
  }
} as const;

export const ManagerNotificationsUrlConfig = MANAGER_NOTIFICATIONS_URLS;
