// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';
import TrainerProgressMain from '@/app/trainer/progress-tracking/progress_components/TrainerProgressMain/TrainerProgressMain';

export const metadata = {
  title: 'Progress Tracking | Trainer | GymSmart',
};

export default function TrainerProgressTrackingPage() {
  return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerProgressMain />
    </Suspense>
  );
}
