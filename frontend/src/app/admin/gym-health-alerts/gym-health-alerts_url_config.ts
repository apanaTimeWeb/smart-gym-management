// RESPONSIBILITY: Centralized URL config for the Admin Gym Health Alerts module.
export const AdminGymHealthAlertsUrlConfig = {
  PAGES: { LIST: '/admin/gym-health-alerts' },
  BACKEND_API: {
    BASE: '/admin/gym-health-alerts',
    DISMISS: (id: string) => `/admin/gym-health-alerts/${id}/dismiss`,
    SUMMARY: '/admin/gym-health-alerts/summary',
  },
} as const;
