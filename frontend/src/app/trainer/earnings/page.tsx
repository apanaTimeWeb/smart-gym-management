// RESPONSIBILITY: Server Component route entry for Trainer earnings.
import { Suspense } from 'react';
import TrainerEarningsLoadingSkeleton from '@/app/trainer/earnings/earnings_components/TrainerEarningsLoadingSkeleton/TrainerEarningsLoadingSkeleton';
import TrainerEarningsMain from '@/app/trainer/earnings/earnings_components/TrainerEarningsMain/TrainerEarningsMain';

export const metadata = { title: 'Earnings | Trainer | Smart Gym 360', description: 'View trainer earnings, commission, and payouts.' };

export default function TrainerEarningsPage() {
  return (
    <Suspense fallback={<TrainerEarningsLoadingSkeleton />}>
      <TrainerEarningsMain />
    </Suspense>
  );
}
