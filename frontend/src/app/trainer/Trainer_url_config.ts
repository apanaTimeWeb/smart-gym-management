// RESPONSIBILITY: Owns only Trainer role-shell page navigation. Feature API/page contracts live in each feature module.
// DATA FLOW: Trainer shell navigation → role page URL constants.

export const TrainerPageUrlConfig = {
  DASHBOARD: '/trainer/dashboard',
  ATTENDANCE: '/trainer/attendance',
  EARNINGS: '/trainer/earnings',
  LIBRARY: '/trainer/library',
  MEMBERS: '/trainer/members',
  NOTIFICATIONS: '/trainer/notifications',
  PROFILE: '/trainer/profile',
  PROGRESS_TRACKING: '/trainer/progress-tracking',
  SCHEDULE: '/trainer/schedule',
  SESSIONS: '/trainer/sessions',
  WORKOUT: '/trainer/workout',
} as const;
