import type { ExerciseFormValues, WorkoutFormValues } from '@/app/frontend_manager/manager_workout/manager_workout_schemas/ManagerWorkoutFormSchemas';
export type { ExerciseFormValues, WorkoutFormValues };
/**
 * @description Provides the ManagerWorkoutFormTypes implementation for the workout module.
 * @dependencies @/app/frontend_manager/manager_workout/manager_workout_schemas/ManagerWorkoutFormSchemas
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_WORKOUT_FORM: WorkoutFormValues = { name: '', level: 'BEGINNER', days: 0, exercises: 0, focus: '', duration: '', tags: '' };
export const EMPTY_EXERCISE_FORM: ExerciseFormValues = { name: '', muscle: '', equipment: 'Barbell', difficulty: 'BEGINNER' };
