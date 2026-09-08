// RESPONSIBILITY: Centralized URL config for the Admin Bulk Communications module.
export const AdminBulkCommunicationsUrlConfig = {
  PAGES: { LIST: '/admin/bulk-communications' },
  BACKEND_API: {
    BASE: '/admin/bulk-communications',
    SEND: '/admin/bulk-communications/send',
    TEMPLATES: '/admin/bulk-communications/templates',
    HISTORY: '/admin/bulk-communications/history',
  },
} as const;
