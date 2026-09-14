// RESPONSIBILITY: Single source of truth for Dashboard local routes and API endpoints.
export const SuperadminDashboardUrlConfig = {
  PAGES: {
    DASHBOARD: '/superadmin/dashboard',
    CHURN_ALERTS: '/superadmin/churn-alerts',
  },
  BACKEND_API: {
    DASHBOARD_DATA: '/superadmin/dashboard',
  },
} as const;
