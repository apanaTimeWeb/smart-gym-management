// RESPONSIBILITY: Centralized URL configuration for the Trainer Sessions module. No hardcoded URLs anywhere else.

export const TRAINER_SESSIONS_ROUTES = {
  index: '/trainer/sessions',
} as const;

export const TRAINER_SESSIONS_API_ROUTES = {
  list: '/api/v1/trainer/sessions',
  create: '/api/v1/trainer/sessions',
  update: (id: string) => `/api/v1/trainer/sessions/${id}`,
  cancel: (id: string) => `/api/v1/trainer/sessions/${id}/cancel`,
  markAttendance: (id: string) => `/api/v1/trainer/sessions/${id}/attendance`,
} as const;
