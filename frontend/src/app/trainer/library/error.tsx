// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { LibraryUrlConfig } from '@/app/trainer/library/library_url_config';

export default function LibraryRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="library" route={LibraryUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
