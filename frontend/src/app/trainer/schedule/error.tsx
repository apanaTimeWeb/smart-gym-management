'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { ScheduleUrlConfig } from '@/app/trainer/schedule/schedule_url_config';

export default function ScheduleRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="schedule" route={ScheduleUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
