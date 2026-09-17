import { Suspense } from 'react';
// RESPONSIBILITY: Server Component route entry for Trainer earnings.
import TrainerEarningsMain from '@/app/trainer/earnings/earnings_components/TrainerEarningsMain/TrainerEarningsMain';

export const metadata = { title: 'Earnings | Trainer | Smart Gym 360', description: 'View trainer earnings, commission, and payouts.' };

export default function TrainerEarningsPage() {
  return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerEarningsMain />
    </Suspense>
  );
}
