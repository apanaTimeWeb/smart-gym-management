// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Diet Library module.
export const LibraryUrlConfig = {
  PAGES: {
    LIBRARY: '/admin/library',
  },
  BACKEND_API: {
    EXERCISES_BASE: '/admin/library/exercises',
    EXERCISE_UPDATE: (id: string) => `/admin/library/exercises/${id}`,
    EXERCISE_DELETE: (id: string) => `/admin/library/exercises/${id}`,
    DIET_PLANS_BASE: '/admin/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/admin/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/admin/library/diet-plans/${id}`,
  }
};
