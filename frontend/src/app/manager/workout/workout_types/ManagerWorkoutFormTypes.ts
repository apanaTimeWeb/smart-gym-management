import type { ExerciseFormValues, WorkoutFormValues } from '@/app/manager/workout/workout_schemas/ManagerWorkoutFormSchemas';
export type { ExerciseFormValues, WorkoutFormValues };
export const EMPTY_WORKOUT_FORM: WorkoutFormValues = { name: '', level: 'Beginner', days: 0, exercises: 0, focus: '', duration: '', tags: '' };
export const EMPTY_EXERCISE_FORM: ExerciseFormValues = { name: '', muscle: '', equipment: 'Barbell', difficulty: 'Beginner' };
