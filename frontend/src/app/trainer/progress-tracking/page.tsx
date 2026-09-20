// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';
import TrainerProgressTrackingLoadingSkeleton from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressTrackingLoadingSkeleton/TrainerProgressTrackingLoadingSkeleton';
import TrainerProgressMain from '@/app/trainer/progress-tracking/progress_components/TrainerProgressMain/TrainerProgressMain';

export const metadata = {
  title: 'Progress Tracking | Trainer | GymSmart',
};

export default function TrainerProgressTrackingPage() {
  return (
    <Suspense fallback={<TrainerProgressTrackingLoadingSkeleton />}>
      <TrainerProgressMain />
    </Suspense>
  );
}
