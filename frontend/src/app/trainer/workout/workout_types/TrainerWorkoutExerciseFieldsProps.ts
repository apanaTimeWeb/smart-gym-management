// RESPONSIBILITY: Owns the typed props contract for this component.
import type { Control, UseFormRegister, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import type { CreateWorkoutFormValues } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

export interface TrainerWorkoutExerciseFieldsProps {
  control: Control<CreateWorkoutFormValues>;
  register: UseFormRegister<CreateWorkoutFormValues>;
}
