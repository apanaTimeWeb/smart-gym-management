export const LibraryUrlConfig = {
  PAGES: {
    LIBRARY: '/library',
  },
  BACKEND_API: {
    EXERCISES_BASE: '/library/exercises',
    EXERCISE_UPDATE: (id: number) => `/library/exercises/${id}`,
    EXERCISE_DELETE: (id: number) => `/library/exercises/${id}`,
    DIET_PLANS_BASE: '/library/diet-plans',
    DIET_PLAN_UPDATE: (id: number) => `/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: number) => `/library/diet-plans/${id}`,
  }
};
