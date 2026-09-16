import { Suspense } from 'react';
// RESPONSIBILITY: Server Component route entry for Trainer earnings.
import TrainerEarningsMain from '@/app/trainer/earnings/earnings_components/TrainerEarningsMain/TrainerEarningsMain';

export const metadata = { title: 'Earnings | Trainer | Smart Gym 360', description: 'View trainer earnings, commission, and payouts.' };

export default function TrainerEarningsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerEarningsMain />
    </Suspense>
  );
}
