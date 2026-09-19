// RESPONSIBILITY: Owns every route and API path used by the Manager Library module.
export const ManagerLibraryUrlConfig = {
  PAGES: { LIBRARY: '/manager/library' },
  BACKEND_API: {
    BASE: '/api/v1/manager/library',
    EXERCISES_BASE: '/api/v1/manager/library/exercises',
    EXERCISE_UPDATE: (id: string) => `/api/v1/manager/library/exercises/${id}`,
    EXERCISE_DELETE: (id: string) => `/api/v1/manager/library/exercises/${id}`,
    DIET_PLANS_BASE: '/api/v1/manager/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/api/v1/manager/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/api/v1/manager/library/diet-plans/${id}`,
  },
} as const;
