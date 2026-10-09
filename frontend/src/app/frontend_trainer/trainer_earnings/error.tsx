"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import { TRAINER_EARNINGS_URLS } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_url_config';

import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/TrainerInfrastructureRouteErrorFallback';




/**
 * @description Provides the earnings route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerEarningsRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_earnings-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="earnings" route={TRAINER_EARNINGS_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
