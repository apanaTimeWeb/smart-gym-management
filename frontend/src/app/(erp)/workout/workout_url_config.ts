export const WorkoutUrlConfig = {
  PAGES: {
    EXERCISES: '/workout/exercises',
    DIET_PLANS: '/workout/diet-plans',
  },
  BACKEND_API: {
    EXERCISES_BASE: '/workout/exercises',
    EXERCISE_UPDATE: (id: number) => `/workout/exercises/${id}`,
    EXERCISE_DELETE: (id: number) => `/workout/exercises/${id}`,
    DIET_PLANS_BASE: '/workout/diet-plans',
    DIET_PLAN_UPDATE: (id: number) => `/workout/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: number) => `/workout/diet-plans/${id}`,
  }
};
