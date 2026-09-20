// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { ProfileUrlConfig } from '@/app/trainer/profile/profile_url_config';

export default function ProfileRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="profile" route={ProfileUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
