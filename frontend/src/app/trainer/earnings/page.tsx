import { Suspense } from 'react';
import TrainerEarningsMain from '@/app/trainer/earnings/earnings_components/TrainerEarningsMain/TrainerEarningsMain';

export const metadata = {
  title: 'Earnings | Trainer | Smart Gym 360',
  description: 'View trainer earnings, commission, and payouts.',
};

export default function TrainerEarningsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading module...</div>}>
      <TrainerEarningsMain />
    </Suspense>
  );
}
