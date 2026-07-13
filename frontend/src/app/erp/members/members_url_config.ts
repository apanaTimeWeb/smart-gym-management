// RESPONSIBILITY: Contains logic, types, or component definition for this module.
export const MembersUrlConfig = {
  PAGES: {
    LIST: '/erp/members',
    ADD: '/erp/members/add',
  },
  BACKEND_API: {
    BASE: '/erp/members',
    STATS: '/erp/members/stats',
    RENEW: (id: number) => `/erp/members/${id}/renew`,
    GET_ONE: (id: number) => `/erp/members/${id}`,
    UPDATE: (id: number) => `/erp/members/${id}`,
    DELETE: (id: number) => `/erp/members/${id}`,
  }
};

