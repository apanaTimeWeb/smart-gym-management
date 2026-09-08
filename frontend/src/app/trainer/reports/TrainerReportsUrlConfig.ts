// RESPONSIBILITY: Centralized URL configuration for the Trainer Reports module.

export const TRAINER_REPORTS_ROUTES = {
  index: '/trainer/reports',
} as const;

export const TRAINER_REPORTS_API_ROUTES = {
  members: '/api/v1/trainer/reports/members',
  attendance: '/api/v1/trainer/reports/attendance',
  progress: '/api/v1/trainer/reports/progress',
  workout: '/api/v1/trainer/reports/workout',
  export: (type: string) => `/api/v1/trainer/reports/${type}/export`,
} as const;
