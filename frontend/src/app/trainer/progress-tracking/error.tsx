'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { ProgressUrlConfig } from '@/app/trainer/progress-tracking/progress-tracking_url_config';

export default function ProgressTrackingRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="progress-tracking" route={ProgressUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
