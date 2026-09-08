// RESPONSIBILITY: Centralized URL config for the Admin Branches module.
// All page routes and backend API endpoints for branches live here.
// Never hardcode these strings directly in components or hooks.

export const AdminBranchesUrlConfig = {
  PAGES: {
    LIST: '/admin/branches',
  },
  BACKEND_API: {
    BASE: '/admin/branches',
    BY_ID: (id: string) => `/admin/branches/${id}`,
    STATS: '/admin/branches/stats',
  },
} as const;
