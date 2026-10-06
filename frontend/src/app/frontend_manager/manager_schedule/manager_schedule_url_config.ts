// RESPONSIBILITY: Owns every route path used by the Manager schedule module.
/**
 * @description Canonical Manager schedule URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_SCHEDULE_UI_PAGE_HOME_URL = '/frontend_manager/manager_schedule';
export const MANAGER_SCHEDULE_BACKEND_API_BASE_URL = '/frontend_manager/manager_schedule';
export const MANAGER_SCHEDULE_BACKEND_API_STATS_URL = '/frontend_manager/manager_schedule/stats';
export const MANAGER_SCHEDULE_BACKEND_API_SHIFTS_URL = '/frontend_manager/manager_schedule/shifts';
export const MANAGER_SCHEDULE_BACKEND_API_SHIFT_URL = (id: string) => `/frontend_manager/manager_schedule/shifts/${id}`;

export const MANAGER_SCHEDULE_URLS = {
  UI: {
    HOME: MANAGER_SCHEDULE_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_SCHEDULE_BACKEND_API_BASE_URL,
    STATS: MANAGER_SCHEDULE_BACKEND_API_STATS_URL,
    SHIFTS: MANAGER_SCHEDULE_BACKEND_API_SHIFTS_URL,
    SHIFT: MANAGER_SCHEDULE_BACKEND_API_SHIFT_URL
  }
} as const;

export const ManagerScheduleUrlConfig = MANAGER_SCHEDULE_URLS;
