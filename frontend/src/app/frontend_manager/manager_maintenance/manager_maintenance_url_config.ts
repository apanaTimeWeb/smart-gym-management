// RESPONSIBILITY: Owns every route path used by the Manager maintenance module.
/**
 * @description Canonical Manager maintenance URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_MAINTENANCE_PAGES_HOME_URL = '/manager/maintenance';
export const MANAGER_MAINTENANCE_BACKEND_API_BASE_URL = '/manager/maintenance';
export const MANAGER_MAINTENANCE_BACKEND_API_RESOLVE_URL = (id: string) => `/manager/maintenance/${id}/resolve`;

export const MANAGER_MAINTENANCE_URLS = {
  PAGES: {
    HOME: MANAGER_MAINTENANCE_PAGES_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_MAINTENANCE_BACKEND_API_BASE_URL,
    RESOLVE: MANAGER_MAINTENANCE_BACKEND_API_RESOLVE_URL
  }
} as const;

export const ManagerMaintenanceUrlConfig = MANAGER_MAINTENANCE_URLS;
