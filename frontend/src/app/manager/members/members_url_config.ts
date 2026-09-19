// RESPONSIBILITY: Owns every route path used by the Manager members module.
export const ManagerMembersUrlConfig = {
  PAGES: { LIST: '/manager/members', ADD: '/manager/members' },
  BACKEND_API: {
    BASE: '/manager/members',
    STATS: '/manager/members/stats',
    PLANS_SNAPSHOT: '/manager/members/plans',
    TRAINERS: '/manager/members/trainers',
    DIET_PLANS: '/manager/members/diet-plans',
    WORKOUTS: '/manager/members/workouts',
    ATTENDANCE: (id: string) => `/manager/members/${id}/attendance`,
    PAYMENTS: (id: string) => `/manager/members/${id}/payments`,
    RENEW: (id: string) => `/manager/members/${id}/renew`,
    GET_ONE: (id: string) => `/manager/members/${id}`,
    UPDATE: (id: string) => `/manager/members/${id}`,
    DELETE: (id: string) => `/manager/members/${id}`,
    POST_PAYMENT: (id: string) => `/manager/members/${id}/payments`,
    DIET_ASSIGN: (id: string) => `/manager/members/${id}/diet-plans`,
    WORKOUT_ASSIGN: (id: string) => `/manager/members/${id}/workouts`,
    EXPORT: '/manager/members/export',
    RESEND_WELCOME: (id: string) => `/manager/members/${id}/resend-welcome`,
  },
  INTEGRATIONS: { WHATSAPP_WEB_BASE: 'https://wa.me' },
} as const;
