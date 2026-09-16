import { Suspense } from 'react';
import TrainerSessionsMain from '@/app/trainer/sessions/sessions_components/TrainerSessionsMain';

export const metadata = {
  title: 'Sessions | Trainer | GymSmart',
};

export default function TrainerSessionsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerSessionsMain />
    </Suspense>
  );
}
