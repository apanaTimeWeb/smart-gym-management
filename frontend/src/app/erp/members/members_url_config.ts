// RESPONSIBILITY: Single source of truth for all URLs used by the Members module.
// Both page routes (for navigation) and backend API endpoints are defined here.
// No file in the Members module should ever hardcode a URL string — always import from here.
export const MembersUrlConfig = {
  PAGES: {
    LIST: '/erp/members',
    ADD: '/erp/members/add',
  },
  BACKEND_API: {
    BASE: '/erp/members',
    STATS: '/erp/members/stats',
    RENEW: (id: string) => `/erp/members/${id}/renew`,
    GET_ONE: (id: string) => `/erp/members/${id}`,
    UPDATE: (id: string) => `/erp/members/${id}`,
    DELETE: (id: string) => `/erp/members/${id}`,
  }
};

