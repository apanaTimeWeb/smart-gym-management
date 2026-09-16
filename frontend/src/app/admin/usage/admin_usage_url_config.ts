// RESPONSIBILITY: Centralized URL config for the Admin Usage & Subscription module.
// All page routes and backend API endpoints for usage live here.
// Never hardcode these strings directly in components or hooks.

export const AdminUsageUrlConfig = {
  PAGES: {
    USAGE: '/admin/usage',
  },
  BACKEND_API: {
    MY_USAGE: '/admin/usage',
    UPGRADE_REQUEST: '/admin/usage/upgrade-request',
    PLAN_OPTIONS: '/admin/usage/plans',
  },
} as const;
