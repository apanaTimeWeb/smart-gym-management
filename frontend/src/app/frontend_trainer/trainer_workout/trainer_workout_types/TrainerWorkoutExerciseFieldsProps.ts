// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerWorkoutCreateWorkoutFormValues } from '@/app/frontend_trainer/trainer_workout/trainer_workout_types/TrainerWorkoutTypes';

import type { Control, UseFormRegister } from 'react-hook-form';

export interface TrainerWorkoutExerciseFieldsProps {
  control: Control<TrainerWorkoutCreateWorkoutFormValues>;
  register: UseFormRegister<TrainerWorkoutCreateWorkoutFormValues>;
}
