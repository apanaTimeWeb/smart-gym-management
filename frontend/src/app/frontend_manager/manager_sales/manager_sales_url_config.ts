// RESPONSIBILITY: Owns every route path used by the Manager sales module.
/**
 * @description Canonical Manager sales URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_SALES_UI_PAGE_HOME_URL = '/frontend_manager/manager_sales';
export const MANAGER_SALES_BACKEND_API_BASE_URL = '/frontend_manager/manager_sales';
export const MANAGER_SALES_BACKEND_API_OVERVIEW_URL = '/frontend_manager/manager_sales/overview';
export const MANAGER_SALES_BACKEND_API_MEMBERSHIP_REPORT_URL = '/frontend_manager/manager_sales/membership-report';
export const MANAGER_SALES_BACKEND_API_PENDING_PAYMENTS_URL = '/frontend_manager/manager_sales/pending-payments';
export const MANAGER_SALES_BACKEND_API_ALL_MEMBERSHIPS_URL = '/frontend_manager/manager_sales/all-memberships';
export const MANAGER_SALES_BACKEND_API_STATS_URL = '/frontend_manager/manager_sales/stats';
export const MANAGER_SALES_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_SALES_URLS = {
  UI: {
    HOME: MANAGER_SALES_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_SALES_BACKEND_API_BASE_URL,
    OVERVIEW: MANAGER_SALES_BACKEND_API_OVERVIEW_URL,
    MEMBERSHIP_REPORT: MANAGER_SALES_BACKEND_API_MEMBERSHIP_REPORT_URL,
    PENDING_PAYMENTS: MANAGER_SALES_BACKEND_API_PENDING_PAYMENTS_URL,
    ALL_MEMBERSHIPS: MANAGER_SALES_BACKEND_API_ALL_MEMBERSHIPS_URL,
    STATS: MANAGER_SALES_BACKEND_API_STATS_URL
  },
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_SALES_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;

export const ManagerSalesUrlConfig = MANAGER_SALES_URLS;
