import { Suspense } from 'react';
import TrainerScheduleMain from '@/app/trainer/schedule/schedule_components/TrainerScheduleMain/TrainerScheduleMain';

export const metadata = {
  title: 'Schedule & Leaves | GymSmart Trainer',
};

export default function TrainerSchedulePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerScheduleMain />
    </Suspense>
  );
}
