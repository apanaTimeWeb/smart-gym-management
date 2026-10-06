// RESPONSIBILITY: Owns every route path used by the Manager profile module.
/**
 * @description Canonical Manager profile URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_PROFILE_UI_PAGE_HOME_URL = '/frontend_manager/manager_profile';
export const MANAGER_PROFILE_BACKEND_API_BASE_URL = '/frontend_manager/manager_profile';
export const MANAGER_PROFILE_BACKEND_API_PASSWORD_URL = '/frontend_manager/manager_profile/password';
export const MANAGER_PROFILE_BACKEND_API_STATS_URL = '/frontend_manager/manager_profile/stats';

export const MANAGER_PROFILE_URLS = {
  UI: {
    HOME: MANAGER_PROFILE_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_PROFILE_BACKEND_API_BASE_URL,
    PASSWORD: MANAGER_PROFILE_BACKEND_API_PASSWORD_URL,
    STATS: MANAGER_PROFILE_BACKEND_API_STATS_URL
  }
} as const;

export const ManagerProfileUrlConfig = MANAGER_PROFILE_URLS;
