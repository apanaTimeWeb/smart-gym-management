// RESPONSIBILITY: Centralized URL configuration for the Trainer Notifications module.

export const TRAINER_NOTIFICATIONS_ROUTES = {
  index: '/trainer/notifications',
} as const;

export const TRAINER_NOTIFICATIONS_API_ROUTES = {
  list: '/api/v1/trainer/notifications',
  markRead: (id: string) => `/api/v1/trainer/notifications/${id}/read`,
  markAllRead: '/api/v1/trainer/notifications/read-all',
  delete: (id: string) => `/api/v1/trainer/notifications/${id}`,
  clearAll: '/api/v1/trainer/notifications',
} as const;
