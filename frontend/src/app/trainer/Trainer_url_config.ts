// RESPONSIBILITY: Single Trainer-module source of truth for all internal page routes and feature API routes.
// DATA FLOW: UI/API call sites → URL config constants → router or apiFetch.

export const TrainerPageUrlConfig = {
  DASHBOARD: '/trainer/dashboard',
  ATTENDANCE: '/trainer/attendance',
  EARNINGS: '/trainer/earnings',
  LIBRARY: '/trainer/library',
  MEMBERS: '/trainer/members',
  NOTIFICATIONS: '/trainer/notifications',
  PROFILE: '/trainer/profile',
  PROGRESS_TRACKING: '/trainer/progress-tracking',
  SCHEDULE: '/trainer/schedule',
  SESSIONS: '/trainer/sessions',
  WORKOUT: '/trainer/workout',
} as const;

export const DashboardUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.DASHBOARD },
  BACKEND_API: { STATS: '/trainer/dashboard/stats' }
} as const;

export const WorkoutUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.WORKOUT },
  BACKEND_API: { BASE: '/trainer/workout', WORKOUTS: '/trainer/workout/workouts', EXERCISES: '/trainer/workout/exercises' }
} as const;

export const ProgressUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.PROGRESS_TRACKING },
  BACKEND_API: {
    MEMBERS: '/trainer/progress-tracking/members',
    ENTRIES: (memberId: string) => `/trainer/progress-tracking/${memberId}/entries`,
    ENTRY_DETAIL: (memberId: string, entryId: string) => `/trainer/progress-tracking/${memberId}/entries/${entryId}`,
    SUMMARY: (memberId: string) => `/trainer/progress-tracking/${memberId}/summary`,
  }
} as const;

export const MembersUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.MEMBERS, ADD: TrainerPageUrlConfig.MEMBERS },
  BACKEND_API: {
    BASE: '/trainer/members', STATS: '/trainer/members/stats',
    GET_ONE: (id: string) => `/trainer/members/${id}`, UPDATE: (id: string) => `/trainer/members/${id}`,
    ATTENDANCE: (id: string) => `/trainer/members/${id}/attendance`,
    DIET_PLANS: '/trainer/library/diet-plans',
    WORKOUT_PLANS: '/trainer/workout/workouts',
    PROGRESS_ENTRIES: (id: string) => `/trainer/progress-tracking/${id}/entries`,
    EXPORT_CSV: '/trainer/members/export?format=csv'
  }
} as const;

export const LibraryUrlConfig = {
  PAGES: { LIBRARY: TrainerPageUrlConfig.LIBRARY },
  BACKEND_API: {
    DIET_PLANS_BASE: '/trainer/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/trainer/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/trainer/library/diet-plans/${id}`,
    ASSIGN_DIET: (id: string) => `/trainer/members/${id}/diet`
  }
} as const;

export const ScheduleUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.SCHEDULE },
  BACKEND_API: { SCHEDULE: '/trainer/schedule', AVAILABILITY: '/trainer/schedule/availability', LEAVES: '/trainer/schedule/leaves' }
} as const;

export const AttendanceUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.ATTENDANCE },
  BACKEND_API: { BASE: '/trainer/attendance', STATS: '/trainer/attendance/stats', TODAY_STATS: '/trainer/attendance/today-stats', CHECKOUT: (id: string) => `/trainer/attendance/${id}/checkout`, EXPORT_CSV: '/trainer/attendance/export?format=csv' }
} as const;

export const EarningsUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.EARNINGS },
  BACKEND_API: { DATA: '/trainer/earnings' }
} as const;
export const TrainerEarningsUrlConfig = { BACKEND_API: { KPIS: '/trainer/earnings/kpis', PENDING: '/trainer/earnings/pending', HISTORY: '/trainer/earnings/history', EXPORT_CSV: '/trainer/earnings/export?format=csv' } } as const;

export const ProfileUrlConfig = {
  PAGES: { LIST: TrainerPageUrlConfig.PROFILE },
  BACKEND_API: { PROFILE: '/trainer/profile', PASSWORD: '/trainer/profile/password' }
} as const;

export const TRAINER_NOTIFICATIONS_ROUTES = { index: TrainerPageUrlConfig.NOTIFICATIONS } as const;
export const TRAINER_NOTIFICATIONS_API_ROUTES = {
  list: '/trainer/notifications', listPaginated: (page: number, limit: number) => `/trainer/notifications?page=${page}&limit=${limit}`,
  markRead: (id: string) => `/trainer/notifications/${id}/read`, markAllRead: '/trainer/notifications/read-all',
  WS_ENDPOINT: '/trainer/notifications/ws', PREFERENCES: '/trainer/notifications/preferences'
} as const;

export const TRAINER_SESSIONS_ROUTES = { index: TrainerPageUrlConfig.SESSIONS } as const;
export const TRAINER_SESSIONS_API_ROUTES = {
  list: '/trainer/sessions', create: '/trainer/sessions', update: (id: string) => `/trainer/sessions/${id}`,
  cancel: (id: string) => `/trainer/sessions/${id}/cancel`, markAttendance: (id: string) => `/trainer/sessions/${id}/attendance`,
  members: '/trainer/sessions/members'
} as const;
