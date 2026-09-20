// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';
import TrainerScheduleLoadingSkeleton from '@/app/trainer/schedule/schedule_components/TrainerScheduleLoadingSkeleton/TrainerScheduleLoadingSkeleton';
import TrainerScheduleMain from '@/app/trainer/schedule/schedule_components/TrainerScheduleMain/TrainerScheduleMain';

export const metadata = {
  title: 'Schedule & Leaves | GymSmart Trainer',
};

export default function TrainerSchedulePage() {
  return (
    <Suspense fallback={<TrainerScheduleLoadingSkeleton />}>
      <TrainerScheduleMain />
    </Suspense>
  );
}
