// RESPONSIBILITY: Centralized route constants for the GymSmart frontend.
// Used by middleware.ts to protect authenticated pages and redirect unauthenticated users.
// All page navigation in the app must use these constants — never hardcode route strings.
export const ROUTES = {
  LOGIN: '/auth/login',
  DASHBOARD: '/erp/dashboard',
  SUPERADMIN_DASHBOARD: '/superadmin/dashboard',
  ERP_PREFIXES: [
    '/erp/dashboard',
    '/erp/members',
    '/erp/plans',
    '/erp/finance',
    '/erp/hr',
    '/erp/attendance',
    '/erp/store',
    '/erp/workout',
    '/erp/inquiries',
    '/erp/settings',
    '/erp/library',
    '/erp/sales',
    '/erp/audit',
  ]
};
