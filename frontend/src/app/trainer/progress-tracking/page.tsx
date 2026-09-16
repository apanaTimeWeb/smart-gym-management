import { Suspense } from 'react';
import TrainerProgressMain from '@/app/trainer/progress-tracking/progress_components/TrainerProgressMain/TrainerProgressMain';

export const metadata = {
  title: 'Progress Tracking | Trainer | GymSmart',
};

export default function TrainerProgressTrackingPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerProgressMain />
    </Suspense>
  );
}
