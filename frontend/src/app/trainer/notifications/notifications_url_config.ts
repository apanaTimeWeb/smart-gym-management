// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Notifications feature.
export const TrainerNotificationsUrlConfig = {
  PAGES: { LIST: '/trainer/notifications' },
  BACKEND_API: {
    LIST: '/trainer/notifications',
    LIST_PAGINATED: (page: number, limit: number) => `/trainer/notifications?page=${page}&limit=${limit}`,
    MARK_READ: (id: string) => `/trainer/notifications/${id}/read`,
    MARK_ALL_READ: '/trainer/notifications/read-all',
    WS_ENDPOINT: '/trainer/notifications/ws',
    PREFERENCES: '/trainer/notifications/preferences',
  },
} as const;
