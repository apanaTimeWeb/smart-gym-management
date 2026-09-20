export const ADMIN_CAMPAIGNS_URL = {
  PAGES: {
    MAIN: '/admin/campaigns',
  },
  API: {
    GET_AUDIENCES: '/api/admin/campaigns/audiences',
    GET_TEMPLATES: '/api/admin/campaigns/templates',
    GET_RECIPIENTS: '/api/admin/campaigns/recipients',
    CREATE_CAMPAIGN: '/api/admin/campaigns/create',
  },
} as const;
