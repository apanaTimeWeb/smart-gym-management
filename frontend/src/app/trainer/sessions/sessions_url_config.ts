// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Sessions feature.
export const TrainerSessionsUrlConfig = {
  PAGES: { LIST: '/trainer/sessions' },
  BACKEND_API: {
    LIST: '/trainer/sessions',
    CREATE: '/trainer/sessions',
    UPDATE: (id: string) => `/trainer/sessions/${id}`,
    CANCEL: (id: string) => `/trainer/sessions/${id}/cancel`,
    MARK_ATTENDANCE: (id: string) => `/trainer/sessions/${id}/attendance`,
    MEMBERS: '/trainer/sessions/members',
  },
} as const;
