import { z } from 'zod';
import { MANAGER_WORKOUT_MAX_DAYS, MANAGER_WORKOUT_MAX_EXERCISES } from '@/app/manager/workout/workout_utils/ManagerWorkoutSharedConstants';


export const managerWorkoutFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  level: z.string().min(1, 'Level is required'),
  days: z.coerce.number().int().min(1, 'Must be a valid number > 0').max(MANAGER_WORKOUT_MAX_DAYS, 'Too many days'),
  exercises: z.coerce.number().int().min(1, 'Must be a valid number > 0').max(MANAGER_WORKOUT_MAX_EXERCISES, 'Too many exercises'),
  focus: z.string().min(2, 'Focus area is required'),
  duration: z.string().min(2, 'Duration is required'),
  tags: z.string(),
});

export type WorkoutFormValues = z.infer<typeof managerWorkoutFormSchema>;

export const managerExerciseFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  muscle: z.string().min(2, 'Primary muscle is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
});

export type ExerciseFormValues = z.infer<typeof managerExerciseFormSchema>;
