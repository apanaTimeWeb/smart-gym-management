// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { MembersUrlConfig } from '@/app/trainer/members/members_url_config';

export default function MembersRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="members" route={MembersUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
