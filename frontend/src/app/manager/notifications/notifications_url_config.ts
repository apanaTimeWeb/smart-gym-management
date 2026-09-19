// RESPONSIBILITY: Owns every route path used by the Manager notifications module.
export const ManagerNotificationsUrlConfig = {
  UI: { HOME: '/manager/notifications' },
  BACKEND_API: {
    BASE: '/manager/notifications',
    STATS: '/manager/notifications/stats',
    MARK_READ: (id: string) => `/manager/notifications/${id}/read`,
    MARK_ALL_READ: '/manager/notifications/read-all',
    DELETE: (id: string) => `/manager/notifications/${id}`,
  },
} as const;
