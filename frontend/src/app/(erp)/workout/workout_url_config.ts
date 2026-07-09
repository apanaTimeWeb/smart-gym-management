export const WorkoutUrlConfig = {
  PAGES: {
    WORKOUTS: '/workout',
    EXERCISES: '/workout/exercises',
    DIET_PLANS: '/workout/diet-plans',
  },
  BACKEND_API: {
    WORKOUTS_BASE: '/workout/workouts',
    WORKOUT_UPDATE: (id: number) => `/workout/workouts/${id}`,
    WORKOUT_DELETE: (id: number) => `/workout/workouts/${id}`,
    EXERCISES_BASE: '/workout/exercises',
    EXERCISE_UPDATE: (id: number) => `/workout/exercises/${id}`,
    EXERCISE_DELETE: (id: number) => `/workout/exercises/${id}`,
    DIET_PLANS_BASE: '/workout/diet-plans',
    DIET_PLAN_UPDATE: (id: number) => `/workout/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: number) => `/workout/diet-plans/${id}`,
  }
};
