// RESPONSIBILITY: Owns every route path used by the Manager finance module.
/**
 * @description Canonical Manager finance URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_FINANCE_PAGES_LIST_URL = '/manager/finance';
export const MANAGER_FINANCE_BACKEND_API_BASE_URL = '/manager/finance';
export const MANAGER_FINANCE_BACKEND_API_PAYMENTS_BASE_URL = '/manager/finance/payments';
export const MANAGER_FINANCE_BACKEND_API_PAYMENTS_BY_MEMBER_URL = (memberId: string) => `/manager/finance/payments/member/${memberId}`;
export const MANAGER_FINANCE_BACKEND_API_SUMMARY_URL = '/manager/finance/summary';
export const MANAGER_FINANCE_BACKEND_API_EXPORT_URL = '/manager/finance/export';
export const MANAGER_FINANCE_BACKEND_API_CHART_URL = '/manager/finance/chart';

export const MANAGER_FINANCE_URLS = {
  PAGES: {
    LIST: MANAGER_FINANCE_PAGES_LIST_URL
  },
  BACKEND_API: {
    BASE: MANAGER_FINANCE_BACKEND_API_BASE_URL,
    PAYMENTS_BASE: MANAGER_FINANCE_BACKEND_API_PAYMENTS_BASE_URL,
    PAYMENTS_BY_MEMBER: MANAGER_FINANCE_BACKEND_API_PAYMENTS_BY_MEMBER_URL,
    SUMMARY: MANAGER_FINANCE_BACKEND_API_SUMMARY_URL,
    EXPORT: MANAGER_FINANCE_BACKEND_API_EXPORT_URL,
    CHART: MANAGER_FINANCE_BACKEND_API_CHART_URL
  }
} as const;

export const ManagerFinanceUrlConfig = MANAGER_FINANCE_URLS;
