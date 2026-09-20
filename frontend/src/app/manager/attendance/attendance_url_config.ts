// RESPONSIBILITY: Owns every route path used by the Manager attendance module.
export const ManagerAttendanceUrlConfig = {
  UI: { HOME: '/manager/attendance' },
  BACKEND_API: {
    BASE: '/manager/attendance',
    STATS: '/manager/attendance/stats',
    HISTORY: '/manager/attendance/history',
    MEMBERS: '/manager/attendance/members',
    STAFF: '/manager/attendance/staff',
  },
} as const;
