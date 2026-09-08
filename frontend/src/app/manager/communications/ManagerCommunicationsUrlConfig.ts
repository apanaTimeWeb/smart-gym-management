// RESPONSIBILITY: Centralized URL config for the Manager Communications module.
export const ManagerCommunicationsUrlConfig = {
  PAGES: { LIST: '/manager/communications' },
  BACKEND_API: {
    BASE:         '/manager/communications',
    CAMPAIGNS:    '/manager/communications/campaigns',
    KPIS:         '/manager/communications/kpis',
    SEGMENTS:     '/manager/communications/segments',
    SEND:         '/manager/communications/send',
    AUTOMATIONS:  '/manager/communications/automations',
    CHURN_MEMBERS:'/manager/communications/churn/members',
    CHURN_KPIS:   '/manager/communications/churn/kpis',
    WIN_BACK_SEND:'/manager/communications/churn/win-back',
  },
} as const;
