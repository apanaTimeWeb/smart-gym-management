'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { WorkoutUrlConfig } from '@/app/trainer/workout/workout_url_config';

export default function WorkoutRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="workout" route={WorkoutUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
