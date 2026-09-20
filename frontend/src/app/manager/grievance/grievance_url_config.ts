// RESPONSIBILITY: Owns every route path used by the Manager grievance module.
export const ManagerGrievanceUrlConfig = {
  PAGES: {
    HOME: '/manager/grievance',
  },
  BACKEND_API: {
    BASE: '/manager/grievance',
    RESOLVE: (id: string) => `/manager/grievance/${id}/resolve`,
  },
} as const;
