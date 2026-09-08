// RESPONSIBILITY: Centralized URL constants for the Schedule module. Never hardcode URLs in components — import from here.
export const ManagerScheduleUrlConfig = {
  PAGES: {
    SCHEDULE: '/manager/schedule',
  },
  BACKEND_API: {
    BASE: '/manager/schedule',
    TRAINERS: '/manager/schedule/trainers',
    KPIS: '/manager/schedule/kpis',
    SHIFTS_BASE: '/manager/schedule/shifts',
    SHIFT_GET_ONE: (id: string) => `/manager/schedule/shifts/${id}`,
    SHIFT_UPDATE: (id: string) => `/manager/schedule/shifts/${id}`,
    SHIFT_DELETE: (id: string) => `/manager/schedule/shifts/${id}`,
  },
} as const;
