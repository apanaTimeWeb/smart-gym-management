'use client';
// RESPONSIBILITY: Entry component for the Workout Library module. Wraps the UI in the context provider and handles page layout.
import TrainerWorkoutBanner from '@/app/trainer/workout/workout_components/TrainerWorkoutBanner/TrainerWorkoutBanner';
import TrainerWorkoutToolbar from '@/app/trainer/workout/workout_components/TrainerWorkoutToolbar/TrainerWorkoutToolbar';
import TrainerWorkoutPlansGrid from '@/app/trainer/workout/workout_components/TrainerWorkoutPlansGrid/TrainerWorkoutPlansGrid';
import TrainerWorkoutExerciseTable from '@/app/trainer/workout/workout_components/TrainerWorkoutExerciseTable/TrainerWorkoutExerciseTable';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';
import TrainerWorkoutModal from '@/app/trainer/workout/workout_components/TrainerWorkoutModal/TrainerWorkoutModal';
import TrainerWorkoutExerciseModal from '@/app/trainer/workout/workout_components/TrainerWorkoutExerciseModal/TrainerWorkoutExerciseModal';

export default function TrainerWorkoutMain() {
  const { tab } = useTrainerWorkoutFilters();

  return (
    <div className="min-h-full pb-10 workout-module bg-page text-primary">
      <div className="p-6 space-y-5">
        <TrainerWorkoutBanner />
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <TrainerWorkoutToolbar />
          <div className="p-5">
            {tab === 'Workout Plans' ? <TrainerWorkoutPlansGrid /> : <TrainerWorkoutExerciseTable />}
          </div>
        </div>
      </div>
      <TrainerWorkoutModal />
      <TrainerWorkoutExerciseModal />
    </div>
  );
}

