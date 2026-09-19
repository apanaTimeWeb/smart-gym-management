import { Suspense } from 'react';
import TrainerWorkoutLoadingSkeleton from '@/app/trainer/workout/workout_components/TrainerWorkoutLoadingSkeleton/TrainerWorkoutLoadingSkeleton';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Workout Library module entry point.
import TrainerWorkoutMain from '@/app/trainer/workout/workout_components/TrainerWorkoutMain/TrainerWorkoutMain';

export default function WorkoutPage() {
 return (
    <Suspense fallback={<TrainerWorkoutLoadingSkeleton />}>
      <TrainerWorkoutMain />
    </Suspense>
  );
}

