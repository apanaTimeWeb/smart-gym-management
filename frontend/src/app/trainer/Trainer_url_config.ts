// RESPONSIBILITY: Single Trainer-module source of truth for all page and API URLs.
// DATA FLOW: Feature API clients → Trainer_url_config.ts → centralized apiFetch.

export const DashboardUrlConfig = { BACKEND_API: { STATS: '/trainer/dashboard/stats' } } as const;

export const WorkoutUrlConfig = {
  PAGES: { LIST: '/trainer/workout' },
  BACKEND_API: { BASE: '/trainer/workout', WORKOUTS: '/trainer/workout/workouts', EXERCISES: '/trainer/workout/exercises' }
} as const;

export const ProgressUrlConfig = {
  BACKEND_API: {
    MEMBERS: '/trainer/progress-tracking/members',
    ENTRIES: (memberId: string) => `/trainer/progress-tracking/${memberId}/entries`,
    ENTRY_DETAIL: (memberId: string, entryId: string) => `/trainer/progress-tracking/${memberId}/entries/${entryId}`,
    SUMMARY: (memberId: string) => `/trainer/progress-tracking/${memberId}/summary`,
  }
} as const;

export const MembersUrlConfig = {
  PAGES: { LIST: '/trainer/members', ADD: '/trainer/members' },
  BACKEND_API: {
    BASE: '/trainer/members', STATS: '/trainer/members/stats',
    GET_ONE: (id: string) => `/trainer/members/${id}`, UPDATE: (id: string) => `/trainer/members/${id}`,
    EXPORT_CSV: '/trainer/members/export?format=csv'
  }
} as const;

export const LibraryUrlConfig = {
  PAGES: { LIBRARY: '/trainer/library' },
  BACKEND_API: {
    DIET_PLANS_BASE: '/trainer/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/trainer/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/trainer/library/diet-plans/${id}`,
    ASSIGN_DIET: (id: string) => `/trainer/members/${id}/diet`
  }
} as const;

export const ScheduleUrlConfig = { BACKEND_API: { SCHEDULE: '/trainer/schedule', AVAILABILITY: '/trainer/schedule/availability', LEAVES: '/trainer/schedule/leaves' } } as const;

export const AttendanceUrlConfig = {
  PAGES: { LIST: '/trainer/attendance' },
  BACKEND_API: { BASE: '/trainer/attendance', TODAY_STATS: '/trainer/attendance/today-stats', CHECKOUT: (id: string) => `/trainer/attendance/${id}/checkout`, EXPORT_CSV: '/trainer/attendance/export?format=csv' }
} as const;

export const EarningsUrlConfig = { BACKEND_API: { DATA: '/trainer/earnings' } } as const;
export const TrainerEarningsUrlConfig = { BACKEND_API: { KPIS: '/trainer/earnings/kpis', PENDING: '/trainer/earnings/pending', HISTORY: '/trainer/earnings/history', EXPORT_CSV: '/trainer/earnings/export?format=csv' } } as const;

export const ProfileUrlConfig = { BACKEND_API: { PROFILE: '/trainer/profile', PASSWORD: '/trainer/profile/password' } } as const;

export const TRAINER_NOTIFICATIONS_ROUTES = { index: '/trainer/notifications' } as const;
export const TRAINER_NOTIFICATIONS_API_ROUTES = {
  list: '/trainer/notifications',
  listPaginated: (page: number, limit: number) => `/trainer/notifications?page=${page}&limit=${limit}`,
  markRead: (id: string) => `/trainer/notifications/${id}/read`,
  markAllRead: '/trainer/notifications/read-all',
  WS_ENDPOINT: '/trainer/notifications/ws', PREFERENCES: '/trainer/notifications/preferences'
} as const;

export const TRAINER_SESSIONS_ROUTES = { index: '/trainer/sessions' } as const;
export const TRAINER_SESSIONS_API_ROUTES = {
  list: '/trainer/sessions', create: '/trainer/sessions',
  update: (id: string) => `/trainer/sessions/${id}`,
  cancel: (id: string) => `/trainer/sessions/${id}/cancel`,
  markAttendance: (id: string) => `/trainer/sessions/${id}/attendance`,
  members: '/trainer/sessions/members'
} as const;

