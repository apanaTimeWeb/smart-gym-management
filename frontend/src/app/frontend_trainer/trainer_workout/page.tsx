// RESPONSIBILITY: Server Component route entry that renders the TrainerWorkout client boundary without duplicating client data requests.
import { Suspense } from 'react';

import TrainerWorkoutLoadingSkeleton from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_loading_skeleton/TrainerWorkoutLoadingSkeleton';

import TrainerWorkoutMain from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_main/TrainerWorkoutMain';





/**
 * @description Provides the server-owned Next.js route entry point for the workout feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutPage() {
 return (
    <Suspense fallback={<TrainerWorkoutLoadingSkeleton />}>
      <TrainerWorkoutMain />
    </Suspense>
  );
}

