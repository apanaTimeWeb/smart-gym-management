// RESPONSIBILITY: Owns every route path used by the Manager plans module.
/**
 * @description Canonical Manager plans URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_PLANS_PAGES_LIST_URL = '/frontend_manager/manager_plans';
export const MANAGER_PLANS_BACKEND_API_BASE_URL = '/frontend_manager/manager_plans';
export const MANAGER_PLANS_BACKEND_API_MEMBERSHIP_OVERVIEW_URL = '/frontend_manager/manager_plans/membership-overview';
export const MANAGER_PLANS_BACKEND_API_MEMBERSHIP_ACTIVATE_URL = '/frontend_manager/manager_plans/membership-activate';
export const MANAGER_PLANS_BACKEND_API_MEMBERSHIP_RENEW_URL = '/frontend_manager/manager_plans/membership-renew';
export const MANAGER_PLANS_BACKEND_API_MEMBERSHIP_FREEZE_URL = '/frontend_manager/manager_plans/membership-freeze';
export const MANAGER_PLANS_BACKEND_API_CHANGE_REQUESTS_URL = '/frontend_manager/manager_plans/change-requests';
export const MANAGER_PLANS_BACKEND_API_GET_ONE_URL = (id: string) => `/frontend_manager/manager_plans/${id}`;
export const MANAGER_PLANS_BACKEND_API_UPDATE_URL = (id: string) => `/frontend_manager/manager_plans/${id}`;
export const MANAGER_PLANS_BACKEND_API_DELETE_URL = (id: string) => `/frontend_manager/manager_plans/${id}`;

export const MANAGER_PLANS_URLS = {
  PAGES: {
    LIST: MANAGER_PLANS_PAGES_LIST_URL
  },
  BACKEND_API: {
    BASE: MANAGER_PLANS_BACKEND_API_BASE_URL,
    MEMBERSHIP_OVERVIEW: MANAGER_PLANS_BACKEND_API_MEMBERSHIP_OVERVIEW_URL,
    MEMBERSHIP_ACTIVATE: MANAGER_PLANS_BACKEND_API_MEMBERSHIP_ACTIVATE_URL,
    MEMBERSHIP_RENEW: MANAGER_PLANS_BACKEND_API_MEMBERSHIP_RENEW_URL,
    MEMBERSHIP_FREEZE: MANAGER_PLANS_BACKEND_API_MEMBERSHIP_FREEZE_URL,
    CHANGE_REQUESTS: MANAGER_PLANS_BACKEND_API_CHANGE_REQUESTS_URL,
    GET_ONE: MANAGER_PLANS_BACKEND_API_GET_ONE_URL,
    UPDATE: MANAGER_PLANS_BACKEND_API_UPDATE_URL,
    DELETE: MANAGER_PLANS_BACKEND_API_DELETE_URL
  }
} as const;

export const ManagerPlansUrlConfig = MANAGER_PLANS_URLS;
