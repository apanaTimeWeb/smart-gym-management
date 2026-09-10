// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the HR module.
// Rule 3: Export name prefixed with Admin per module naming convention.
export const AdminHrUrlConfig = {
  PAGES: {
    STAFF_LIST: '/admin/hr',
    PAYROLL: '/admin/hr',
  },
  BACKEND_API: {
    STAFF_BASE: '/admin/hr/staff',
    STAFF_GET_ONE: (id: string) => `/admin/hr/staff/${id}`,
    STAFF_UPDATE: (id: string) => `/admin/hr/staff/${id}`,
    STAFF_DELETE: (id: string) => `/admin/hr/staff/${id}`,
    BULK_DEACTIVATE: '/admin/hr/staff/bulk-deactivate',
    PAYROLLS_BASE: '/admin/hr/payrolls',
    PAYROLL_STATUS_UPDATE: (id: string) => `/admin/hr/payrolls/${id}/status`,
    SUMMARY: '/admin/hr/summary',
  }
} as const;

/** @deprecated Use AdminHrUrlConfig */
export const HrUrlConfig = AdminHrUrlConfig;
