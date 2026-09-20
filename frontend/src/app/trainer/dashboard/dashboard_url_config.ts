// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Dashboard feature.
export const DashboardUrlConfig = {
  PAGES: {
    LIST: '/trainer/dashboard',
    WORKOUT: '/trainer/workout',
    ATTENDANCE: '/trainer/attendance',
    MEMBERS: '/trainer/members',
    LIBRARY: '/trainer/library',
    PROGRESS_TRACKING: '/trainer/progress-tracking',
    SCHEDULE: '/trainer/schedule',
  },
  BACKEND_API: { STATS: '/trainer/dashboard/stats' },
} as const;
