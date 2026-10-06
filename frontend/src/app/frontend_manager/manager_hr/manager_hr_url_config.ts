// RESPONSIBILITY: Owns every route path used by the Manager hr module.
/**
 * @description Canonical Manager hr URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_HR_PAGES_STAFF_LIST_URL = '/frontend_manager/manager_hr';
export const MANAGER_HR_PAGES_PAYROLL_URL = '/frontend_manager/manager_hr';
export const MANAGER_HR_BACKEND_API_BASE_URL = '/frontend_manager/manager_hr';
export const MANAGER_HR_BACKEND_API_STAFF_BASE_URL = '/frontend_manager/manager_hr/staff';
export const MANAGER_HR_BACKEND_API_STAFF_GET_ONE_URL = (id: string) => `/frontend_manager/manager_hr/staff/${id}`;
export const MANAGER_HR_BACKEND_API_STAFF_UPDATE_URL = (id: string) => `/frontend_manager/manager_hr/staff/${id}`;
export const MANAGER_HR_BACKEND_API_STAFF_DELETE_URL = (id: string) => `/frontend_manager/manager_hr/staff/${id}`;
export const MANAGER_HR_BACKEND_API_PAYROLLS_BASE_URL = '/frontend_manager/manager_hr/payrolls';
export const MANAGER_HR_BACKEND_API_PAYROLL_GET_ONE_URL = (id: string) => `/frontend_manager/manager_hr/payrolls/${id}`;
export const MANAGER_HR_BACKEND_API_PAYROLL_CREATE_URL = '/frontend_manager/manager_hr/payrolls';
export const MANAGER_HR_BACKEND_API_PAYROLL_UPDATE_URL = (id: string) => `/frontend_manager/manager_hr/payrolls/${id}`;
export const MANAGER_HR_BACKEND_API_PAYROLL_GENERATE_URL = '/frontend_manager/manager_hr/payrolls/generate';
export const MANAGER_HR_BACKEND_API_PAYROLL_STATUS_UPDATE_URL = (id: string) => `/frontend_manager/manager_hr/payrolls/${id}/status`;
export const MANAGER_HR_BACKEND_API_SUMMARY_URL = '/frontend_manager/manager_hr/summary';
export const MANAGER_HR_BACKEND_API_LEDGER_URL = (staffId: string) => `/frontend_manager/manager_hr/ledger/${staffId}`;
export const MANAGER_HR_BACKEND_API_LEDGER_ADVANCE_URL = '/frontend_manager/manager_hr/ledger/advance';
export const MANAGER_HR_BACKEND_API_LEDGER_PAY_DUE_URL = '/frontend_manager/manager_hr/ledger/paydue';
export const MANAGER_HR_BACKEND_API_STAFF_ATTENDANCE_BASE_URL = (staffId: string) => `/frontend_manager/manager_hr/staff/${staffId}/attendance`;
export const MANAGER_HR_BACKEND_API_STAFF_ATTENDANCE_URL = (staffId: string, month: string) => `/frontend_manager/manager_hr/staff/${staffId}/attendance?month=${encodeURIComponent(month)}`;

export const MANAGER_HR_URLS = {
  PAGES: {
    STAFF_LIST: MANAGER_HR_PAGES_STAFF_LIST_URL,
    PAYROLL: MANAGER_HR_PAGES_PAYROLL_URL
  },
  BACKEND_API: {
    BASE: MANAGER_HR_BACKEND_API_BASE_URL,
    STAFF_BASE: MANAGER_HR_BACKEND_API_STAFF_BASE_URL,
    STAFF_GET_ONE: MANAGER_HR_BACKEND_API_STAFF_GET_ONE_URL,
    STAFF_UPDATE: MANAGER_HR_BACKEND_API_STAFF_UPDATE_URL,
    STAFF_DELETE: MANAGER_HR_BACKEND_API_STAFF_DELETE_URL,
    PAYROLLS_BASE: MANAGER_HR_BACKEND_API_PAYROLLS_BASE_URL,
    PAYROLL_GET_ONE: MANAGER_HR_BACKEND_API_PAYROLL_GET_ONE_URL,
    PAYROLL_CREATE: MANAGER_HR_BACKEND_API_PAYROLL_CREATE_URL,
    PAYROLL_UPDATE: MANAGER_HR_BACKEND_API_PAYROLL_UPDATE_URL,
    PAYROLL_GENERATE: MANAGER_HR_BACKEND_API_PAYROLL_GENERATE_URL,
    PAYROLL_STATUS_UPDATE: MANAGER_HR_BACKEND_API_PAYROLL_STATUS_UPDATE_URL,
    SUMMARY: MANAGER_HR_BACKEND_API_SUMMARY_URL,
    LEDGER: MANAGER_HR_BACKEND_API_LEDGER_URL,
    LEDGER_ADVANCE: MANAGER_HR_BACKEND_API_LEDGER_ADVANCE_URL,
    LEDGER_PAY_DUE: MANAGER_HR_BACKEND_API_LEDGER_PAY_DUE_URL,
    STAFF_ATTENDANCE_BASE: MANAGER_HR_BACKEND_API_STAFF_ATTENDANCE_BASE_URL,
    STAFF_ATTENDANCE: MANAGER_HR_BACKEND_API_STAFF_ATTENDANCE_URL
  }
} as const;

export const ManagerHrUrlConfig = MANAGER_HR_URLS;
