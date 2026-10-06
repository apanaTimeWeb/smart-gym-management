// RESPONSIBILITY: Owns every route path used by the Manager communications module.
/**
 * @description Canonical Manager communications URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_COMMUNICATIONS_UI_PAGE_HOME_URL = '/frontend_manager/manager_communications';
export const MANAGER_COMMUNICATIONS_BACKEND_API_BASE_URL = '/frontend_manager/manager_communications';
export const MANAGER_COMMUNICATIONS_BACKEND_API_CAMPAIGNS_URL = '/frontend_manager/manager_communications/campaigns';
export const MANAGER_COMMUNICATIONS_BACKEND_API_KPIS_URL = '/frontend_manager/manager_communications/kpis';
export const MANAGER_COMMUNICATIONS_BACKEND_API_SEGMENT_URL = (segment: string) => `/frontend_manager/manager_communications/segments/${segment}`;
export const MANAGER_COMMUNICATIONS_BACKEND_API_AUTOMATIONS_URL = '/frontend_manager/manager_communications/automations';
export const MANAGER_COMMUNICATIONS_BACKEND_API_AUTOMATION_URL = (id: string) => `/frontend_manager/manager_communications/automations/${id}`;
export const MANAGER_COMMUNICATIONS_BACKEND_API_CHURNED_MEMBERS_URL = '/frontend_manager/manager_communications/churned-members';
export const MANAGER_COMMUNICATIONS_BACKEND_API_CHURN_KPIS_URL = '/frontend_manager/manager_communications/churn-kpis';
export const MANAGER_COMMUNICATIONS_BACKEND_API_WIN_BACK_URL = '/frontend_manager/manager_communications/win-back';
export const MANAGER_COMMUNICATIONS_BACKEND_API_STATS_URL = '/frontend_manager/manager_communications/stats';
export const MANAGER_COMMUNICATIONS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_COMMUNICATIONS_URLS = {
  UI: {
    HOME: MANAGER_COMMUNICATIONS_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_COMMUNICATIONS_BACKEND_API_BASE_URL,
    CAMPAIGNS: MANAGER_COMMUNICATIONS_BACKEND_API_CAMPAIGNS_URL,
    KPIS: MANAGER_COMMUNICATIONS_BACKEND_API_KPIS_URL,
    SEGMENT: MANAGER_COMMUNICATIONS_BACKEND_API_SEGMENT_URL,
    AUTOMATIONS: MANAGER_COMMUNICATIONS_BACKEND_API_AUTOMATIONS_URL,
    AUTOMATION: MANAGER_COMMUNICATIONS_BACKEND_API_AUTOMATION_URL,
    CHURNED_MEMBERS: MANAGER_COMMUNICATIONS_BACKEND_API_CHURNED_MEMBERS_URL,
    CHURN_KPIS: MANAGER_COMMUNICATIONS_BACKEND_API_CHURN_KPIS_URL,
    WIN_BACK: MANAGER_COMMUNICATIONS_BACKEND_API_WIN_BACK_URL,
    STATS: MANAGER_COMMUNICATIONS_BACKEND_API_STATS_URL
  },
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_COMMUNICATIONS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;

export const ManagerCommunicationsUrlConfig = MANAGER_COMMUNICATIONS_URLS;
