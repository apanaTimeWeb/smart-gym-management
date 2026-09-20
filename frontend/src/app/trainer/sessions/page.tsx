// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';
import TrainerSessionsLoadingSkeleton from '@/app/trainer/sessions/sessions_components/TrainerSessionsLoadingSkeleton/TrainerSessionsLoadingSkeleton';
import TrainerSessionsMain from '@/app/trainer/sessions/sessions_components/TrainerSessionsMain/TrainerSessionsMain';

export const metadata = {
  title: 'Sessions | Trainer | GymSmart',
};

export default function TrainerSessionsPage() {
  return (
    <Suspense fallback={<TrainerSessionsLoadingSkeleton />}>
      <TrainerSessionsMain />
    </Suspense>
  );
}
