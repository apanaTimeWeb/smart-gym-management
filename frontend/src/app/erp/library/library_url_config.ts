// RESPONSIBILITY: library_url_config.ts handles the logic and UI for its corresponding feature.
export const LibraryUrlConfig = {
  PAGES: {
    LIBRARY: '/erp/library',
  },
  BACKEND_API: {
    EXERCISES_BASE: '/erp/library/exercises',
    EXERCISE_UPDATE: (id: number) => `/erp/library/exercises/${id}`,
    EXERCISE_DELETE: (id: number) => `/erp/library/exercises/${id}`,
    DIET_PLANS_BASE: '/erp/library/diet-plans',
    DIET_PLAN_UPDATE: (id: number) => `/erp/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: number) => `/erp/library/diet-plans/${id}`,
  }
};
