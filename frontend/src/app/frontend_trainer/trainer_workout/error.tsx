"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/TrainerInfrastructureRouteErrorFallback';

import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_url_config';




/**
 * @description Provides the workout route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerWorkoutRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_workout-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="workout" route={TRAINER_WORKOUT_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
