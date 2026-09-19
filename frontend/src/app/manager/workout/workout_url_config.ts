// RESPONSIBILITY: Owns every route path used by the Manager workout module.
export const ManagerWorkoutUrlConfig = {
  UI: { HOME: '/manager/workout' },
  BACKEND_API: {
    BASE: '/manager/workout', WORKOUTS_BASE: '/manager/workouts', WORKOUT: (id: string) => `/manager/workouts/${id}`,
    WORKOUT_EXERCISES: (query: string) => `/manager/workouts/exercises${query ? `?${query}` : ''}`,
    EXERCISES_BASE: '/manager/workouts/exercises', EXERCISE: (id: string) => `/manager/workouts/exercises/${id}`,
    ASSIGNMENTS: '/manager/workout/assignments', STATS: '/manager/workout/stats'
  }
};
