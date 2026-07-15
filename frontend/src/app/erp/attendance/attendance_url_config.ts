// RESPONSIBILITY: Centralized URL constants for the Attendance module — frontend page routes and backend API endpoints. Import from here; never hardcode URLs in components.
export const AttendanceUrlConfig = {
  PAGES: {
    LIST: '/erp/attendance',
  },
  BACKEND_API: {
    BASE: '/erp/attendance',
    TODAY_STATS: '/erp/attendance/today-stats',
  }
};
