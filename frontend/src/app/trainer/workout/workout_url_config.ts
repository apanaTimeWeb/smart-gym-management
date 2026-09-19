// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Workout feature.
export const WorkoutUrlConfig = {
  PAGES: { LIST: '/trainer/workout' },
  BACKEND_API: {
    BASE: '/trainer/workout',
    WORKOUTS: '/trainer/workout/workouts',
    EXERCISES: '/trainer/workout/exercises',
  },
} as const;
