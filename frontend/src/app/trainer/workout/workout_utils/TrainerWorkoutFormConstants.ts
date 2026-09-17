export const TRAINER_WORKOUT_LEVEL_OPTIONS = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
] as const;

export const TRAINER_DEFAULT_EXERCISE = {
  name: '',
  sets: 3,
  reps: '10',
  weight: '',
  restTime: '60s',
} as const;
