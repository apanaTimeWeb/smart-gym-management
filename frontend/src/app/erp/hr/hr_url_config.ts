// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the HR module.
export const HrUrlConfig = {
  PAGES: {
    STAFF_LIST: '/erp/hr/staff',
    PAYROLL: '/erp/hr/payroll',
  },
  BACKEND_API: {
    STAFF_BASE: '/erp/hr/staff',
    STAFF_GET_ONE: (id: number) => `/erp/hr/staff/${id}`,
    STAFF_UPDATE: (id: number) => `/erp/hr/staff/${id}`,
    STAFF_DELETE: (id: number) => `/erp/hr/staff/${id}`,
    PAYROLLS_BASE: '/erp/hr/payrolls',
    PAYROLL_STATUS_UPDATE: (id: number) => `/erp/hr/payrolls/${id}/status`,
    SUMMARY: '/erp/hr/summary',
  }
};
