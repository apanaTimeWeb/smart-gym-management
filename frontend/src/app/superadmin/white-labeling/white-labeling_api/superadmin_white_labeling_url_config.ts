export const SuperadminWhiteLabelingUrlConfig = {
  PAGES: {
    MAIN: '/superadmin/white-labeling',
  },
  API: {
    DOMAINS: '/superadmin/white-labeling/domains',
    UPDATE_STATUS: (id: string) => `/api/superadmin/white-labeling/domains/${id}/status`,
  }
} as const;

