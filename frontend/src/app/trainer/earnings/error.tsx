'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { EarningsUrlConfig } from '@/app/trainer/earnings/earnings_url_config';

export default function EarningsRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="earnings" route={EarningsUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
