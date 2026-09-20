// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Schedule feature.
export const ScheduleUrlConfig = {
  PAGES: { LIST: '/trainer/schedule' },
  BACKEND_API: {
    SCHEDULE: '/trainer/schedule',
    AVAILABILITY: '/trainer/schedule/availability',
    LEAVES: '/trainer/schedule/leaves',
  },
} as const;
