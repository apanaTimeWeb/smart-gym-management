// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';
import TrainerScheduleMain from '@/app/trainer/schedule/schedule_components/TrainerScheduleMain/TrainerScheduleMain';

export const metadata = {
  title: 'Schedule & Leaves | GymSmart Trainer',
};

export default function TrainerSchedulePage() {
  return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerScheduleMain />
    </Suspense>
  );
}
