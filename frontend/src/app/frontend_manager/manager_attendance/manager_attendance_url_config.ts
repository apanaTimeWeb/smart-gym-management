// RESPONSIBILITY: Owns every route path used by the Manager attendance module.
/**
 * @description Canonical Manager attendance URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_ATTENDANCE_UI_PAGE_HOME_URL = '/manager/attendance';
export const MANAGER_ATTENDANCE_BACKEND_API_BASE_URL = '/manager/attendance';
export const MANAGER_ATTENDANCE_BACKEND_API_STATS_URL = '/manager/attendance/stats';
export const MANAGER_ATTENDANCE_BACKEND_API_HISTORY_URL = '/manager/attendance/history';
export const MANAGER_ATTENDANCE_BACKEND_API_MEMBERS_URL = '/manager/attendance/members';
export const MANAGER_ATTENDANCE_BACKEND_API_STAFF_URL = '/manager/attendance/staff';

export const MANAGER_ATTENDANCE_URLS = {
  UI: {
    HOME: MANAGER_ATTENDANCE_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_ATTENDANCE_BACKEND_API_BASE_URL,
    STATS: MANAGER_ATTENDANCE_BACKEND_API_STATS_URL,
    HISTORY: MANAGER_ATTENDANCE_BACKEND_API_HISTORY_URL,
    MEMBERS: MANAGER_ATTENDANCE_BACKEND_API_MEMBERS_URL,
    STAFF: MANAGER_ATTENDANCE_BACKEND_API_STAFF_URL
  }
} as const;

export const ManagerAttendanceUrlConfig = MANAGER_ATTENDANCE_URLS;
