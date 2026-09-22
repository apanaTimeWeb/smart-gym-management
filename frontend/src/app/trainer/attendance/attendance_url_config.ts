// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Attendance feature.
export const AttendanceUrlConfig = {
  PAGES: { LIST: '/trainer/attendance' },
  BACKEND_API: {
    BASE: '/trainer/attendance',
    STATS: '/trainer/attendance/stats',
    MEMBERS_BASIC: '/trainer/attendance/members-basic',
    TODAY_STATS: '/trainer/attendance/today-stats',
    CHECKOUT: (id: string) => `/trainer/attendance/checkout/${id}`,
  },
} as const;
