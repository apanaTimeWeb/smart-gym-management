// RESPONSIBILITY: Centralized URL config for the Admin Notifications module.
// All page routes and backend API endpoints for notifications live here.

export const AdminNotificationsUrlConfig = {
  PAGES: {
    LIST: '/admin/notifications',
  },
  BACKEND_API: {
    BASE: '/admin/notifications',
    MARK_READ: '/admin/notifications/mark-read',
    MARK_ALL_READ: '/admin/notifications/mark-all-read',
  },
} as const;
