// RESPONSIBILITY: Owns every route path used by the Manager pt module.
/**
 * @description Canonical Manager pt URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_PT_UI_PAGE_HOME_URL = '/manager/pt';
export const MANAGER_PT_BACKEND_API_BASE_URL = '/manager/pt';
export const MANAGER_PT_BACKEND_API_STATS_URL = '/manager/pt/stats';
export const MANAGER_PT_BACKEND_API_KPIS_URL = '/manager/pt/kpis';
export const MANAGER_PT_BACKEND_API_WORKLOAD_URL = '/manager/pt/workload';
export const MANAGER_PT_BACKEND_API_PACKAGES_URL = '/manager/pt/packages';
export const MANAGER_PT_BACKEND_API_ASSIGNMENTS_URL = '/manager/pt/assignments';
export const MANAGER_PT_BACKEND_API_COMPLETE_SESSION_URL = (id: string) => `/manager/pt/assignments/${id}/complete-session`;

export const MANAGER_PT_URLS = {
  UI: {
    HOME: MANAGER_PT_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_PT_BACKEND_API_BASE_URL,
    STATS: MANAGER_PT_BACKEND_API_STATS_URL,
    KPIS: MANAGER_PT_BACKEND_API_KPIS_URL,
    WORKLOAD: MANAGER_PT_BACKEND_API_WORKLOAD_URL,
    PACKAGES: MANAGER_PT_BACKEND_API_PACKAGES_URL,
    ASSIGNMENTS: MANAGER_PT_BACKEND_API_ASSIGNMENTS_URL,
    COMPLETE_SESSION: MANAGER_PT_BACKEND_API_COMPLETE_SESSION_URL
  }
} as const;

export const ManagerPtUrlConfig = MANAGER_PT_URLS;
