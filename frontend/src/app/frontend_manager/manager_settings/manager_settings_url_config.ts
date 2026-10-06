// RESPONSIBILITY: Owns every route path used by the Manager settings module.
/**
 * @description Canonical Manager settings URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_SETTINGS_PAGES_SETTINGS_URL = '/frontend_manager/manager_settings';
export const MANAGER_SETTINGS_BACKEND_API_BASE_URL = '/frontend_manager/manager_settings';

export const MANAGER_SETTINGS_URLS = {
  PAGES: {
    SETTINGS: MANAGER_SETTINGS_PAGES_SETTINGS_URL
  },
  BACKEND_API: {
    BASE: MANAGER_SETTINGS_BACKEND_API_BASE_URL
  }
} as const;

export const ManagerSettingsUrlConfig = MANAGER_SETTINGS_URLS;
