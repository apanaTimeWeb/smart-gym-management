// RESPONSIBILITY: Centralized URL config for the Admin Members module.
export const AdminMembersUrlConfig = {
  PAGES: { LIST: '/admin/members' },
  BACKEND_API: {
    BASE: '/admin/members',
    BY_ID: (id: string) => `/admin/members/${id}`,
    EXPORT: '/admin/members/export',
    STATS: '/admin/members/stats',
  },
} as const;
