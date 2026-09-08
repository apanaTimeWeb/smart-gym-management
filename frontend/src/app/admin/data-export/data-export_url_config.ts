// RESPONSIBILITY: Centralized URL config for the Admin Data Export module.
export const AdminDataExportUrlConfig = {
  PAGES: { LIST: '/admin/data-export' },
  BACKEND_API: {
    BASE: '/admin/data-export',
    REQUEST: '/admin/data-export/request',
    DOWNLOAD: (id: string) => `/admin/data-export/${id}/download`,
    HISTORY: '/admin/data-export/history',
  },
} as const;
