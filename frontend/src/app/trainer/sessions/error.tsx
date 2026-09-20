// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { TrainerSessionsUrlConfig } from '@/app/trainer/sessions/sessions_url_config';

export default function SessionsRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="sessions" route={TrainerSessionsUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
