// RESPONSIBILITY: Centralized URL config for the Admin Announcements module.
export const AdminAnnouncementsUrlConfig = {
  PAGES: { LIST: '/admin/announcements' },
  BACKEND_API: {
    BASE: '/admin/announcements',
    BY_ID: (id: string) => `/admin/announcements/${id}`,
    PUBLISH: (id: string) => `/admin/announcements/${id}/publish`,
  },
} as const;
