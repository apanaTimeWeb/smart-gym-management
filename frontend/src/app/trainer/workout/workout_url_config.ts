// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Workout feature.
export const WorkoutUrlConfig = {
  PAGES: { LIST: '/trainer/workout' },
  BACKEND_API: {
    BASE: '/trainer/workout',
    WORKOUTS: '/trainer/workout/workouts',
    WORKOUT: (id: string) => `/trainer/workout/workouts/${id}`,
    EXERCISES: '/trainer/workout/exercises',
    EXERCISE: (id: string) => `/trainer/workout/exercises/${id}`,
  },
} as const;
