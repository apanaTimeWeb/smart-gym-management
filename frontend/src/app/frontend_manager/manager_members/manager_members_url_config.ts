// RESPONSIBILITY: Owns every route path used by the Manager members module.
/**
 * @description Canonical Manager members URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_MEMBERS_PAGES_LIST_URL = '/manager/members';
export const MANAGER_MEMBERS_PAGES_ADD_URL = '/manager/members';
export const MANAGER_MEMBERS_BACKEND_API_BASE_URL = '/manager/members';
export const MANAGER_MEMBERS_BACKEND_API_STATS_URL = '/manager/members/stats';
export const MANAGER_MEMBERS_BACKEND_API_PLANS_SNAPSHOT_URL = '/manager/members/plans';
export const MANAGER_MEMBERS_BACKEND_API_TRAINERS_URL = '/manager/members/trainers';
export const MANAGER_MEMBERS_BACKEND_API_DIET_PLANS_URL = '/manager/members/diet-plans';
export const MANAGER_MEMBERS_BACKEND_API_WORKOUTS_URL = '/manager/members/workouts';
export const MANAGER_MEMBERS_BACKEND_API_ATTENDANCE_URL = (id: string) => `/manager/members/${id}/attendance`;
export const MANAGER_MEMBERS_BACKEND_API_PAYMENTS_URL = (id: string) => `/manager/members/${id}/payments`;
export const MANAGER_MEMBERS_BACKEND_API_RENEW_URL = (id: string) => `/manager/members/${id}/renew`;
export const MANAGER_MEMBERS_BACKEND_API_GET_ONE_URL = (id: string) => `/manager/members/${id}`;
export const MANAGER_MEMBERS_BACKEND_API_UPDATE_URL = (id: string) => `/manager/members/${id}`;
export const MANAGER_MEMBERS_BACKEND_API_DELETE_URL = (id: string) => `/manager/members/${id}`;
export const MANAGER_MEMBERS_BACKEND_API_POST_PAYMENT_URL = (id: string) => `/manager/members/${id}/payments`;
export const MANAGER_MEMBERS_BACKEND_API_DIET_ASSIGN_URL = (id: string) => `/manager/members/${id}/diet-plans`;
export const MANAGER_MEMBERS_BACKEND_API_WORKOUT_ASSIGN_URL = (id: string) => `/manager/members/${id}/workouts`;
export const MANAGER_MEMBERS_BACKEND_API_EXPORT_URL = '/manager/members/export';
export const MANAGER_MEMBERS_BACKEND_API_RESEND_WELCOME_URL = (id: string) => `/manager/members/${id}/resend-welcome`;
export const MANAGER_MEMBERS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_MEMBERS_URLS = {
  PAGES: {
    LIST: MANAGER_MEMBERS_PAGES_LIST_URL,
    ADD: MANAGER_MEMBERS_PAGES_ADD_URL
  },
  BACKEND_API: {
    BASE: MANAGER_MEMBERS_BACKEND_API_BASE_URL,
    STATS: MANAGER_MEMBERS_BACKEND_API_STATS_URL,
    PLANS_SNAPSHOT: MANAGER_MEMBERS_BACKEND_API_PLANS_SNAPSHOT_URL,
    TRAINERS: MANAGER_MEMBERS_BACKEND_API_TRAINERS_URL,
    DIET_PLANS: MANAGER_MEMBERS_BACKEND_API_DIET_PLANS_URL,
    WORKOUTS: MANAGER_MEMBERS_BACKEND_API_WORKOUTS_URL,
    ATTENDANCE: MANAGER_MEMBERS_BACKEND_API_ATTENDANCE_URL,
    PAYMENTS: MANAGER_MEMBERS_BACKEND_API_PAYMENTS_URL,
    RENEW: MANAGER_MEMBERS_BACKEND_API_RENEW_URL,
    GET_ONE: MANAGER_MEMBERS_BACKEND_API_GET_ONE_URL,
    UPDATE: MANAGER_MEMBERS_BACKEND_API_UPDATE_URL,
    DELETE: MANAGER_MEMBERS_BACKEND_API_DELETE_URL,
    POST_PAYMENT: MANAGER_MEMBERS_BACKEND_API_POST_PAYMENT_URL,
    DIET_ASSIGN: MANAGER_MEMBERS_BACKEND_API_DIET_ASSIGN_URL,
    WORKOUT_ASSIGN: MANAGER_MEMBERS_BACKEND_API_WORKOUT_ASSIGN_URL,
    EXPORT: MANAGER_MEMBERS_BACKEND_API_EXPORT_URL,
    RESEND_WELCOME: MANAGER_MEMBERS_BACKEND_API_RESEND_WELCOME_URL
  },
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_MEMBERS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;

export const ManagerMembersUrlConfig = MANAGER_MEMBERS_URLS;
