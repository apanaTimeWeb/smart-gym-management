// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Diet Library module.
export const LibraryUrlConfig = {
  PAGES: {
    LIBRARY: '/trainer/library',
  },
  BACKEND_API: {
    EXERCISES_BASE: '/trainer/library/exercises',
    EXERCISE_UPDATE: (id: string) => `/trainer/library/exercises/${id}`,
    EXERCISE_DELETE: (id: string) => `/trainer/library/exercises/${id}`,
    DIET_PLANS_BASE: '/trainer/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/trainer/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/trainer/library/diet-plans/${id}`,
  }
};

