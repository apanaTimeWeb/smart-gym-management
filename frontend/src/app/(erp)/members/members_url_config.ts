export const MembersUrlConfig = {
  PAGES: {
    LIST: '/members',
    ADD: '/members/add',
  },
  BACKEND_API: {
    BASE: '/members',
    STATS: '/members/stats',
    RENEW: (id: number) => `/members/${id}/renew`,
    GET_ONE: (id: number) => `/members/${id}`,
    UPDATE: (id: number) => `/members/${id}`,
    DELETE: (id: number) => `/members/${id}`,
  }
};
