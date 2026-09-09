// RESPONSIBILITY: Centralized URL configuration for the Trainer Notifications module.

export const TRAINER_NOTIFICATIONS_ROUTES = {
  index: '/trainer/notifications',
} as const;

export const TRAINER_NOTIFICATIONS_API_ROUTES = {
  list: '/api/v1/trainer/notifications',
  listPaginated: (page: number, limit: number) => `/api/v1/trainer/notifications?page=${page}&limit=${limit}`,
  markRead: (id: string) => `/api/v1/trainer/notifications/${id}/read`,
  markAllRead: '/api/v1/trainer/notifications/read-all',
  // NOTE: delete and clearAll are Manager-only actions. Trainers cannot delete notifications.
  // delete: (id: string) => `/api/v1/trainer/notifications/${id}`, // FORBIDDEN for trainer role
  // clearAll: '/api/v1/trainer/notifications',                     // FORBIDDEN for trainer role
  WS_ENDPOINT: '/trainer/notifications/ws',
  PREFERENCES: '/trainer/notifications/preferences',
} as const;
