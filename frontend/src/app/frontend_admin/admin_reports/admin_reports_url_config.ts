// admin_reports_url_config.ts
// Owned by: frontend_admin/admin_reports feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_REPORTS_ROUTES = {
  root: '/frontend_admin/admin_reports' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_REPORTS_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_REPORTS_BASE_URL = '/frontend_admin/admin_reports' as const;
export const ADMIN_REPORTS_REVENUE_URL = '/admin/reports/revenue' as const;
export const ADMIN_REPORTS_ATTENDANCE_URL = '/admin/reports/attendance' as const;
export const ADMIN_REPORTS_MEMBERS_URL = '/admin/reports/members' as const;
export const ADMIN_REPORTS_PAYROLL_URL = '/admin/reports/payroll' as const;
export const ADMIN_REPORTS_PNL_URL = '/admin/reports/pnl' as const;
export const ADMIN_REPORTS_EXPORT_URL = '/admin/reports/export' as const;

export const ADMIN_REPORTS_URLS = {
  branchReference: ADMIN_REPORTS_BRANCH_REFERENCE_URL,
  base: ADMIN_REPORTS_BASE_URL,
  revenue: ADMIN_REPORTS_REVENUE_URL,
  attendance: ADMIN_REPORTS_ATTENDANCE_URL,
  members: ADMIN_REPORTS_MEMBERS_URL,
  payroll: ADMIN_REPORTS_PAYROLL_URL,
  pnl: ADMIN_REPORTS_PNL_URL,
  export: ADMIN_REPORTS_EXPORT_URL,
} as const;

export const ADMIN_REPORTS_API = ADMIN_REPORTS_URLS;
