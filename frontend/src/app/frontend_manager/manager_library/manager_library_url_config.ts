// RESPONSIBILITY: Owns every route path used by the Manager library module.
/**
 * @description Canonical Manager library URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_LIBRARY_PAGES_LIBRARY_URL = '/manager/library';
export const MANAGER_LIBRARY_BACKEND_API_BASE_URL = '/manager/library';
export const MANAGER_LIBRARY_BACKEND_API_EXERCISES_BASE_URL = '/manager/library/exercises';
export const MANAGER_LIBRARY_BACKEND_API_EXERCISE_UPDATE_URL = (id: string) => `/manager/library/exercises/${id}`;
export const MANAGER_LIBRARY_BACKEND_API_EXERCISE_DELETE_URL = (id: string) => `/manager/library/exercises/${id}`;
export const MANAGER_LIBRARY_BACKEND_API_DIET_PLANS_BASE_URL = '/manager/library/diet-plans';
export const MANAGER_LIBRARY_BACKEND_API_DIET_PLAN_UPDATE_URL = (id: string) => `/manager/library/diet-plans/${id}`;
export const MANAGER_LIBRARY_BACKEND_API_DIET_PLAN_DELETE_URL = (id: string) => `/manager/library/diet-plans/${id}`;

export const MANAGER_LIBRARY_URLS = {
  PAGES: {
    LIBRARY: MANAGER_LIBRARY_PAGES_LIBRARY_URL
  },
  BACKEND_API: {
    BASE: MANAGER_LIBRARY_BACKEND_API_BASE_URL,
    EXERCISES_BASE: MANAGER_LIBRARY_BACKEND_API_EXERCISES_BASE_URL,
    EXERCISE_UPDATE: MANAGER_LIBRARY_BACKEND_API_EXERCISE_UPDATE_URL,
    EXERCISE_DELETE: MANAGER_LIBRARY_BACKEND_API_EXERCISE_DELETE_URL,
    DIET_PLANS_BASE: MANAGER_LIBRARY_BACKEND_API_DIET_PLANS_BASE_URL,
    DIET_PLAN_UPDATE: MANAGER_LIBRARY_BACKEND_API_DIET_PLAN_UPDATE_URL,
    DIET_PLAN_DELETE: MANAGER_LIBRARY_BACKEND_API_DIET_PLAN_DELETE_URL
  }
} as const;

export const ManagerLibraryUrlConfig = MANAGER_LIBRARY_URLS;
