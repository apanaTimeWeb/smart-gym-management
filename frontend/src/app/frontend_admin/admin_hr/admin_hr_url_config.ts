// admin_hr_url_config.ts
// Owned by: frontend_admin/admin_hr feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_HR_ROUTES = {
  root: '/admin/hr' as const,
  dashboard: '/admin/dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_HR_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_HR_STAFF_BASE_URL = '/admin/hr/staff' as const;
export const ADMIN_HR_STAFF_GET_ONE_URL = (id: string) => `/admin/hr/staff/${id}` as const;
export const ADMIN_HR_STAFF_UPDATE_URL = (id: string) => `/admin/hr/staff/${id}` as const;
export const ADMIN_HR_STAFF_DELETE_URL = (id: string) => `/admin/hr/staff/${id}` as const;
export const ADMIN_HR_PAYROLL_UPDATE_URL = (id: string) => `/admin/hr/payrolls/${id}` as const;
export const ADMIN_HR_BULK_DEACTIVATE_URL = '/admin/hr/staff/bulk-deactivate' as const;
export const ADMIN_HR_PAYROLLS_BASE_URL = '/admin/hr/payrolls' as const;
export const ADMIN_HR_PAYROLL_STATUS_UPDATE_URL = (id: string) => `/admin/hr/payrolls/${encodeURIComponent(id)}/status` as const;
export const ADMIN_HR_LEDGER_URL = (id: string) => `/admin/hr/staff/${encodeURIComponent(id)}/ledger` as const;
export const ADMIN_HR_SUMMARY_URL = '/admin/hr/summary' as const;
export const ADMIN_HR_ADVANCES_URL = '/admin/hr/advances' as const;
export const ADMIN_HR_DUES_PAY_URL = '/admin/hr/dues/pay' as const;
export const ADMIN_HR_PERFORMANCE_URL = '/admin/hr/performance' as const;

export const ADMIN_HR_URLS = {
  branchReference: ADMIN_HR_BRANCH_REFERENCE_URL,
  staffBase: ADMIN_HR_STAFF_BASE_URL,
  staffGetOne: ADMIN_HR_STAFF_GET_ONE_URL,
  staffUpdate: ADMIN_HR_STAFF_UPDATE_URL,
  staffDelete: ADMIN_HR_STAFF_DELETE_URL,
  payrollUpdate: ADMIN_HR_PAYROLL_UPDATE_URL,
  bulkDeactivate: ADMIN_HR_BULK_DEACTIVATE_URL,
  payrollsBase: ADMIN_HR_PAYROLLS_BASE_URL,
  payrollStatusUpdate: ADMIN_HR_PAYROLL_STATUS_UPDATE_URL,
  ledger: ADMIN_HR_LEDGER_URL,
  summary: ADMIN_HR_SUMMARY_URL,
  advances: ADMIN_HR_ADVANCES_URL,
  duesPay: ADMIN_HR_DUES_PAY_URL,
  performance: ADMIN_HR_PERFORMANCE_URL,
} as const;

export const ADMIN_HR_API = ADMIN_HR_URLS;
