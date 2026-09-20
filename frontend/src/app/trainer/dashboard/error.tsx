// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';

export default function DashboardRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="dashboard" route={DashboardUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
