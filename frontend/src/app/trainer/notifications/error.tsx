'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { TrainerNotificationsUrlConfig } from '@/app/trainer/notifications/notifications_url_config';

export default function NotificationsRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="notifications" route={TrainerNotificationsUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
