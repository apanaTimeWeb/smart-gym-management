// RESPONSIBILITY: Defines server-side sort fields for Trainer Workout browseable datasets.
export const TRAINER_WORKOUT_SORT_FIELDS = {
  NAME: 'name',
  CATEGORY: 'category',
  DIFFICULTY: 'difficulty',
} as const;
export type TrainerWorkoutSortField = typeof TRAINER_WORKOUT_SORT_FIELDS[keyof typeof TRAINER_WORKOUT_SORT_FIELDS];
export const TRAINER_WORKOUT_SORT_DIRECTIONS = { ASC: 'asc', DESC: 'desc' } as const;
export type TrainerWorkoutSortDirection = typeof TRAINER_WORKOUT_SORT_DIRECTIONS[keyof typeof TRAINER_WORKOUT_SORT_DIRECTIONS];
