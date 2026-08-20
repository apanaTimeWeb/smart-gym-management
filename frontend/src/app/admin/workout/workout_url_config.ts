// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Workout Library module.
export const WorkoutUrlConfig = {
  PAGES: {
    WORKOUTS: '/admin/workout',
    EXERCISES: '/admin/workout/exercises',
    DIET_PLANS: '/admin/workout/diet-plans',
  },
  BACKEND_API: {
    WORKOUTS_BASE: '/admin/workout/workouts',
    WORKOUT_UPDATE: (id: string) => `/admin/workout/workouts/${id}`,
    WORKOUT_DELETE: (id: string) => `/admin/workout/workouts/${id}`,
    EXERCISES_BASE: '/admin/workout/exercises',
    EXERCISE_UPDATE: (id: string) => `/admin/workout/exercises/${id}`,
    EXERCISE_DELETE: (id: string) => `/admin/workout/exercises/${id}`,
    DIET_PLANS_BASE: '/admin/workout/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/admin/workout/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/admin/workout/diet-plans/${id}`,
  }
};
