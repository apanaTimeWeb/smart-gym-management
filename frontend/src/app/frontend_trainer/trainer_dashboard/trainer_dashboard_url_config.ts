// trainer_dashboard_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_dashboard.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_DASHBOARD_PAGE_DASHBOARD = '/trainer/dashboard' as const;
export const TRAINER_DASHBOARD_PAGE_LIST = '/trainer/dashboard' as const;
export const TRAINER_DASHBOARD_PAGE_WORKOUT = '/trainer/workout' as const;
export const TRAINER_DASHBOARD_PAGE_ATTENDANCE = '/trainer/attendance' as const;
export const TRAINER_DASHBOARD_PAGE_MEMBERS = '/trainer/members' as const;
export const TRAINER_DASHBOARD_PAGE_LIBRARY = '/trainer/library' as const;
export const TRAINER_DASHBOARD_PAGE_PROGRESS_TRACKING = '/trainer/progress-tracking' as const;
export const TRAINER_DASHBOARD_PAGE_SCHEDULE = '/trainer/schedule' as const;

export const TRAINER_DASHBOARD_API_STATS = '/trainer/trainer_dashboard/stats' as const;

export const TRAINER_DASHBOARD_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_DASHBOARD_PAGE_DASHBOARD,
    LIST: TRAINER_DASHBOARD_PAGE_LIST,
    WORKOUT: TRAINER_DASHBOARD_PAGE_WORKOUT,
    ATTENDANCE: TRAINER_DASHBOARD_PAGE_ATTENDANCE,
    MEMBERS: TRAINER_DASHBOARD_PAGE_MEMBERS,
    LIBRARY: TRAINER_DASHBOARD_PAGE_LIBRARY,
    PROGRESS_TRACKING: TRAINER_DASHBOARD_PAGE_PROGRESS_TRACKING,
    SCHEDULE: TRAINER_DASHBOARD_PAGE_SCHEDULE,
  } as const,
  API: {
    STATS: TRAINER_DASHBOARD_API_STATS,
  } as const,
} as const;
