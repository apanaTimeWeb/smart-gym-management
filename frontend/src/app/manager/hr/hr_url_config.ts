// RESPONSIBILITY: Owns every route path used by the Manager hr module.
export const ManagerHrUrlConfig = {
  PAGES: { STAFF_LIST: '/manager/hr', PAYROLL: '/manager/hr' },
  BACKEND_API: {
    BASE: '/manager/hr',
    STAFF_BASE: '/manager/hr/staff',
    STAFF_GET_ONE: (id: string) => `/manager/hr/staff/${id}`,
    STAFF_UPDATE: (id: string) => `/manager/hr/staff/${id}`,
    STAFF_DELETE: (id: string) => `/manager/hr/staff/${id}`,
    PAYROLLS_BASE: '/manager/hr/payrolls',
    PAYROLL_GET_ONE: (id: string) => `/manager/hr/payrolls/${id}`,
    PAYROLL_CREATE: '/manager/hr/payrolls',
    PAYROLL_UPDATE: (id: string) => `/manager/hr/payrolls/${id}`,
    PAYROLL_GENERATE: '/manager/hr/payrolls/generate',
    PAYROLL_STATUS_UPDATE: (id: string) => `/manager/hr/payrolls/${id}/status`,
    SUMMARY: '/manager/hr/summary',
    LEDGER: (staffId: string) => `/manager/hr/ledger/${staffId}`,
    LEDGER_ADVANCE: '/manager/hr/ledger/advance',
    LEDGER_PAY_DUE: '/manager/hr/ledger/paydue',
    STAFF_ATTENDANCE: (staffId: string, month: string) => `/manager/hr/staff/${staffId}/attendance?month=${encodeURIComponent(month)}`
  }
};
