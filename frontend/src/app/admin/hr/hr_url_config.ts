// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the HR module.
export const HrUrlConfig = {
  PAGES: {
    STAFF_LIST: '/admin/hr/staff',
    PAYROLL: '/admin/hr/payroll',
  },
  BACKEND_API: {
    STAFF_BASE: '/admin/hr/staff',
    STAFF_GET_ONE: (id: string) => `/admin/hr/staff/${id}`,
    STAFF_UPDATE: (id: string) => `/admin/hr/staff/${id}`,
    STAFF_DELETE: (id: string) => `/admin/hr/staff/${id}`,
    PAYROLLS_BASE: '/admin/hr/payrolls',
    PAYROLL_STATUS_UPDATE: (id: string) => `/admin/hr/payrolls/${id}/status`,
    SUMMARY: '/admin/hr/summary',
  }
};
