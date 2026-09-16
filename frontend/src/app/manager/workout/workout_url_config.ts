// RESPONSIBILITY: Owns every route path used by the Manager workout module.
export const ManagerWorkoutUrlConfig = {
  UI: {
    HOME: '/manager/workout',
  },
  BACKEND_API: {
    BASE: '/manager/workout',
    WORKOUTS_BASE: '/manager/workouts',
    EXERCISES_BASE: '/manager/workouts/exercises',
    STATS: '/manager/workout/stats'
  }
};
