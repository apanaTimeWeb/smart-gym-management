// RESPONSIBILITY: Owns every route path used by the Manager communications module.
export const ManagerCommunicationsUrlConfig = {
  UI: { HOME: '/manager/communications' },
  BACKEND_API: { BASE: '/manager/communications', CAMPAIGNS: '/manager/communications/campaigns', KPIS: '/manager/communications/kpis', SEGMENT: (segment: string) => `/manager/communications/segments/${segment}`, AUTOMATIONS: '/manager/communications/automations', AUTOMATION: (id: string) => `/manager/communications/automations/${id}`, CHURNED_MEMBERS: '/manager/communications/churned-members', CHURN_KPIS: '/manager/communications/churn-kpis', WIN_BACK: '/manager/communications/win-back', STATS: '/manager/communications/stats' },
  INTEGRATIONS: { WHATSAPP_WEB_BASE: 'https://wa.me' }
};
