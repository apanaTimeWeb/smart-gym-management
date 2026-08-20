// RESPONSIBILITY: Centralized URL constants for the Attendance module — frontend page routes and backend API endpoints. Import from here; never hardcode URLs in components.
export const AttendanceUrlConfig = {
  PAGES: {
    LIST: '/admin/attendance',
  },
  BACKEND_API: {
    BASE: '/admin/attendance',
    TODAY_STATS: '/admin/attendance/today-stats',
  }
};
