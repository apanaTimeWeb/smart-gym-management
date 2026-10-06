// RESPONSIBILITY: Owns every route path used by the Manager inquiries module.
/**
 * @description Canonical Manager inquiries URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_INQUIRIES_UI_PAGE_HOME_URL = '/frontend_manager/manager_inquiries';
export const MANAGER_INQUIRIES_BACKEND_API_BASE_URL = '/frontend_manager/manager_inquiries';
export const MANAGER_INQUIRIES_BACKEND_API_STATS_URL = '/frontend_manager/manager_inquiries/stats';
export const MANAGER_INQUIRIES_BACKEND_API_PLANS_URL = '/frontend_manager/manager_inquiries/plans';
export const MANAGER_INQUIRIES_BACKEND_API_PLANS_SNAPSHOT_URL = '/frontend_manager/manager_inquiries/plans-snapshot';
export const MANAGER_INQUIRIES_BACKEND_API_GET_ONE_URL = (id: string) => `/frontend_manager/manager_inquiries/${id}`;
export const MANAGER_INQUIRIES_BACKEND_API_CONVERT_URL = (id: string) => `/frontend_manager/manager_inquiries/${id}/convert`;
export const MANAGER_INQUIRIES_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_INQUIRIES_URLS = {
  UI: {
    HOME: MANAGER_INQUIRIES_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_INQUIRIES_BACKEND_API_BASE_URL,
    STATS: MANAGER_INQUIRIES_BACKEND_API_STATS_URL,
    PLANS: MANAGER_INQUIRIES_BACKEND_API_PLANS_URL,
    PLANS_SNAPSHOT: MANAGER_INQUIRIES_BACKEND_API_PLANS_SNAPSHOT_URL,
    GET_ONE: MANAGER_INQUIRIES_BACKEND_API_GET_ONE_URL,
    CONVERT: MANAGER_INQUIRIES_BACKEND_API_CONVERT_URL
  },
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_INQUIRIES_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;

export const ManagerInquiriesUrlConfig = MANAGER_INQUIRIES_URLS;
