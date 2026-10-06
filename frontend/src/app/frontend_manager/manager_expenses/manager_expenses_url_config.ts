// RESPONSIBILITY: Owns every route path used by the Manager expenses module.
/**
 * @description Canonical Manager expenses URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_EXPENSES_UI_PAGE_HOME_URL = '/frontend_manager/manager_expenses';
export const MANAGER_EXPENSES_BACKEND_API_BASE_URL = '/frontend_manager/manager_expenses';
export const MANAGER_EXPENSES_BACKEND_API_GET_ONE_URL = (id: string) => `/frontend_manager/manager_expenses/${id}`;
export const MANAGER_EXPENSES_BACKEND_API_UPDATE_URL = (id: string) => `/frontend_manager/manager_expenses/${id}`;
export const MANAGER_EXPENSES_BACKEND_API_DELETE_URL = (id: string) => `/frontend_manager/manager_expenses/${id}`;
export const MANAGER_EXPENSES_BACKEND_API_STATS_URL = '/frontend_manager/manager_expenses/stats';

export const MANAGER_EXPENSES_URLS = {
  UI: {
    HOME: MANAGER_EXPENSES_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_EXPENSES_BACKEND_API_BASE_URL,
    GET_ONE: MANAGER_EXPENSES_BACKEND_API_GET_ONE_URL,
    UPDATE: MANAGER_EXPENSES_BACKEND_API_UPDATE_URL,
    DELETE: MANAGER_EXPENSES_BACKEND_API_DELETE_URL,
    STATS: MANAGER_EXPENSES_BACKEND_API_STATS_URL
  }
} as const;

export const ManagerExpensesUrlConfig = MANAGER_EXPENSES_URLS;
