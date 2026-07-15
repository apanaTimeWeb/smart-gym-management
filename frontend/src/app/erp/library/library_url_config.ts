// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Diet Library module.
export const LibraryUrlConfig = {
  PAGES: {
    LIBRARY: '/erp/library',
  },
  BACKEND_API: {
    EXERCISES_BASE: '/erp/library/exercises',
    EXERCISE_UPDATE: (id: string) => `/erp/library/exercises/${id}`,
    EXERCISE_DELETE: (id: string) => `/erp/library/exercises/${id}`,
    DIET_PLANS_BASE: '/erp/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/erp/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/erp/library/diet-plans/${id}`,
  }
};
