// RESPONSIBILITY: Owns every route path used by the Manager referrals module.
/**
 * @description Canonical Manager referrals URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_REFERRALS_UI_PAGE_HOME_URL = '/frontend_manager/manager_referrals';
export const MANAGER_REFERRALS_BACKEND_API_BASE_URL = '/frontend_manager/manager_referrals';
export const MANAGER_REFERRALS_BACKEND_API_STATS_URL = '/frontend_manager/manager_referrals/stats';
export const MANAGER_REFERRALS_BACKEND_API_KPIS_URL = '/frontend_manager/manager_referrals/kpis';
export const MANAGER_REFERRALS_BACKEND_API_CLAIM_URL = (id: string) => `/frontend_manager/manager_referrals/${id}/claim`;

export const MANAGER_REFERRALS_URLS = {
  UI: {
    HOME: MANAGER_REFERRALS_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_REFERRALS_BACKEND_API_BASE_URL,
    STATS: MANAGER_REFERRALS_BACKEND_API_STATS_URL,
    KPIS: MANAGER_REFERRALS_BACKEND_API_KPIS_URL,
    CLAIM: MANAGER_REFERRALS_BACKEND_API_CLAIM_URL
  }
} as const;

export const ManagerReferralsUrlConfig = MANAGER_REFERRALS_URLS;
