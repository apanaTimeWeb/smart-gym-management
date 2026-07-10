export const WorkoutUrlConfig = {
  PAGES: {
    WORKOUTS: '/erp/workout',
    EXERCISES: '/erp/workout/exercises',
    DIET_PLANS: '/erp/workout/diet-plans',
  },
  BACKEND_API: {
    WORKOUTS_BASE: '/erp/workout/workouts',
    WORKOUT_UPDATE: (id: number) => `/erp/workout/workouts/${id}`,
    WORKOUT_DELETE: (id: number) => `/erp/workout/workouts/${id}`,
    EXERCISES_BASE: '/erp/workout/exercises',
    EXERCISE_UPDATE: (id: number) => `/erp/workout/exercises/${id}`,
    EXERCISE_DELETE: (id: number) => `/erp/workout/exercises/${id}`,
    DIET_PLANS_BASE: '/erp/workout/diet-plans',
    DIET_PLAN_UPDATE: (id: number) => `/erp/workout/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: number) => `/erp/workout/diet-plans/${id}`,
  }
};
