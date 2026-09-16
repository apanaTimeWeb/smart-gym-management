import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Workout Library module entry point.
import TrainerWorkoutMain from '@/app/trainer/workout/workout_components/TrainerWorkoutMain/TrainerWorkoutMain';

export default function WorkoutPage() {
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerWorkoutMain />
    </Suspense>
  );
}

