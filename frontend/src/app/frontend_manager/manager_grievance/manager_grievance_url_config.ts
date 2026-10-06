// RESPONSIBILITY: Owns every route path used by the Manager grievance module.
/**
 * @description Canonical Manager grievance URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_GRIEVANCE_PAGES_HOME_URL = '/frontend_manager/manager_grievance';
export const MANAGER_GRIEVANCE_BACKEND_API_BASE_URL = '/frontend_manager/manager_grievance';
export const MANAGER_GRIEVANCE_BACKEND_API_RESOLVE_URL = (id: string) => `/frontend_manager/manager_grievance/${id}/resolve`;

export const MANAGER_GRIEVANCE_URLS = {
  PAGES: {
    HOME: MANAGER_GRIEVANCE_PAGES_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_GRIEVANCE_BACKEND_API_BASE_URL,
    RESOLVE: MANAGER_GRIEVANCE_BACKEND_API_RESOLVE_URL
  }
} as const;

export const ManagerGrievanceUrlConfig = MANAGER_GRIEVANCE_URLS;
