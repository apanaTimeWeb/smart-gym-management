// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the HR module.
export const HrUrlConfig = {
  PAGES: {
    STAFF_LIST: '/erp/hr/staff',
    PAYROLL: '/erp/hr/payroll',
  },
  BACKEND_API: {
    STAFF_BASE: '/erp/hr/staff',
    STAFF_GET_ONE: (id: string) => `/erp/hr/staff/${id}`,
    STAFF_UPDATE: (id: string) => `/erp/hr/staff/${id}`,
    STAFF_DELETE: (id: string) => `/erp/hr/staff/${id}`,
    PAYROLLS_BASE: '/erp/hr/payrolls',
    PAYROLL_STATUS_UPDATE: (id: string) => `/erp/hr/payrolls/${id}/status`,
    SUMMARY: '/erp/hr/summary',
  }
};
