// RESPONSIBILITY: Centralized URL config for the Admin Blacklist module.
export const AdminBlacklistUrlConfig = {
  PAGES: { LIST: '/admin/blacklist' },
  BACKEND_API: {
    BASE: '/admin/blacklist',
    BY_ID: (id: string) => `/admin/blacklist/${id}`,
    REMOVE: (id: string) => `/admin/blacklist/${id}/remove`,
  },
} as const;
