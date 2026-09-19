// RESPONSIBILITY: Owns every route path used by the Manager schedule module.
export const ManagerScheduleUrlConfig = {
  UI: { HOME: '/manager/schedule' },
  BACKEND_API: { BASE: '/manager/schedule', STATS: '/manager/schedule/stats', SHIFTS: '/manager/schedule/shifts', SHIFT: (id: string) => `/manager/schedule/shifts/${id}` }
};
