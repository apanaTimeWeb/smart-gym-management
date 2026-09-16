import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Workout Library module entry point.
import TrainerWorkoutMain from '@/app/trainer/workout/workout_components/TrainerWorkoutMain/TrainerWorkoutMain';

export default function WorkoutPage() {
 return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerWorkoutMain />
    </Suspense>
  );
}

