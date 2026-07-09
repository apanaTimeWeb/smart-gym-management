export const HrUrlConfig = {
  PAGES: {
    STAFF_LIST: '/hr/staff',
    PAYROLL: '/hr/payroll',
  },
  BACKEND_API: {
    STAFF_BASE: '/hr/staff',
    STAFF_GET_ONE: (id: number) => `/hr/staff/${id}`,
    STAFF_UPDATE: (id: number) => `/hr/staff/${id}`,
    STAFF_DELETE: (id: number) => `/hr/staff/${id}`,
    PAYROLLS_BASE: '/hr/payrolls',
    PAYROLL_STATUS_UPDATE: (id: number) => `/hr/payrolls/${id}/status`,
    SUMMARY: '/hr/summary',
  }
};
