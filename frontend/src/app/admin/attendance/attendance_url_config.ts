// RESPONSIBILITY: Centralized URL configuration for the Admin Attendance module.
// All API endpoints and internal page routes used by this module live here.
// Never hardcode these strings in components, hooks, or API files.

export const ADMIN_ATTENDANCE_ROUTES = {
  page: '/admin/attendance',
} as const;

export const ADMIN_ATTENDANCE_API = {
  records:  '/api/v1/admin/attendance/records',
  summary:  '/api/v1/admin/attendance/summary',
  trend:    '/api/v1/admin/attendance/trend',
} as const;
