// RESPONSIBILITY: Owns every route path used by the Manager members module.
export const ManagerMembersUrlConfig = {
  PAGES: {
    LIST: '/manager/members',
    ADD: '/manager/members',
  },
  BACKEND_API: {
    BASE: '/manager/members',
    STATS: '/manager/members/stats',
    PLANS_SNAPSHOT: '/manager/members/plans',
    RENEW: (id: string) => `/manager/members/${id}/renew`,
    GET_ONE: (id: string) => `/manager/members/${id}`,
    UPDATE: (id: string) => `/manager/members/${id}`,
    DELETE: (id: string) => `/manager/members/${id}`,
    POST_PAYMENT: (id: string) => `/manager/members/${id}/payments`,
    EXPORT: '/manager/members/export',
    RESEND_WELCOME: (id: string) => `/manager/members/${id}/resend-welcome`,
  }
};
