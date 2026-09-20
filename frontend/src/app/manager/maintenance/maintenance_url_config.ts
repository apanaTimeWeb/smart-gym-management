// RESPONSIBILITY: Owns every route path used by the Manager maintenance module.
export const ManagerMaintenanceUrlConfig = {
  PAGES: {
    HOME: '/manager/maintenance',
  },
  BACKEND_API: {
    BASE: '/manager/maintenance',
    RESOLVE: (id: string) => `/manager/maintenance/${id}/resolve`,
  },
} as const;
