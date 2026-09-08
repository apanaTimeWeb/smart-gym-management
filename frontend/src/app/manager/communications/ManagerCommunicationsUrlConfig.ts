// RESPONSIBILITY: Centralized URL config for the Manager Communications module.
export const ManagerCommunicationsUrlConfig = {
  PAGES: { LIST: '/manager/communications' },
  BACKEND_API: {
    BASE:      '/manager/communications',
    CAMPAIGNS: '/manager/communications/campaigns',
    KPIS:      '/manager/communications/kpis',
    SEGMENTS:  '/manager/communications/segments',
    SEND:      '/manager/communications/send',
  },
} as const;
