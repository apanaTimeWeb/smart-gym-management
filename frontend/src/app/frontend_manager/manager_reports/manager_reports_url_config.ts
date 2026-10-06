// RESPONSIBILITY: Owns every route path used by the Manager reports module.
/**
 * @description Canonical Manager reports URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_REPORTS_PAGES_LIST_URL = '/manager/reports';
export const MANAGER_REPORTS_BACKEND_API_BASE_URL = '/manager/reports';
export const MANAGER_REPORTS_BACKEND_API_SUMMARY_URL = '/manager/reports/summary';

export const MANAGER_REPORTS_URLS = {
  PAGES: {
    LIST: MANAGER_REPORTS_PAGES_LIST_URL
  },
  BACKEND_API: {
    BASE: MANAGER_REPORTS_BACKEND_API_BASE_URL,
    SUMMARY: MANAGER_REPORTS_BACKEND_API_SUMMARY_URL,
  }
} as const;

export const ManagerReportsUrlConfig = MANAGER_REPORTS_URLS;
