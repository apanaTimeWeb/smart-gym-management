"use client";
// RESPONSIBILITY: Entry component for the TrainerWorkoutWorkout Library module. Wraps the UI in the context provider and handles page layout.
import TrainerWorkoutBanner from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_banner/TrainerWorkoutBanner';

import TrainerWorkoutExerciseModal from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_exercise_modal/TrainerWorkoutExerciseModal';

import TrainerWorkoutExerciseTable from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_exercise_table/TrainerWorkoutExerciseTable';

import TrainerWorkoutModal from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_modal/TrainerWorkoutModal';

import TrainerWorkoutPlansGrid from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_plans_grid/TrainerWorkoutPlansGrid';

import TrainerWorkoutToolbar from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_toolbar/TrainerWorkoutToolbar';

import { TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_constants/TrainerWorkoutConstants';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_workout/trainer_workout_hooks/useTrainerWorkoutFilters';










/**
 * @description Entry component for the TrainerWorkoutWorkout Library module. Wraps the UI in the context provider and handles page layout.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the workout feature UI responsibility represented by TrainerWorkoutMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutMain() {
  const { tab } = useTrainerWorkoutFilters();

  return (
    <div className="min-h-full pb-10 workout-module bg-page text-primary">
      <div className="p-6 space-y-5">
        <TrainerWorkoutBanner />
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <TrainerWorkoutToolbar />
          <div className="p-5">
            {tab === TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value ? <TrainerWorkoutPlansGrid /> : <TrainerWorkoutExerciseTable />}
          </div>
        </div>
      </div>
      <TrainerWorkoutModal />
      <TrainerWorkoutExerciseModal />
    </div>
  );
}

