'use client';

import { AlertCircle } from 'lucide-react';
import { useTrainerEarningsLogic } from '@/app/trainer/earnings/earnings_context/useTrainerEarningsLogic';
import TrainerEarningsKPIs from '@/app/trainer/earnings/earnings_components/TrainerEarningsKPIs/TrainerEarningsKPIs';
import TrainerEarningsPending from '@/app/trainer/earnings/earnings_components/TrainerEarningsPending/TrainerEarningsPending';
import TrainerEarningsHistory from '@/app/trainer/earnings/earnings_components/TrainerEarningsHistory/TrainerEarningsHistory';

export default function TrainerEarningsMain() {
  const { fetchState, error } = useTrainerEarningsLogic();

  if (fetchState === 'error') {
    return (
      <div className="p-6 bg-danger/10 border border-danger rounded-xl flex items-center gap-3 text-danger">
        <AlertCircle size={20} />
        <p className="text-sm font-medium">{error || 'Failed to load earnings data.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Earnings & Payouts</h1>
        <p className="text-secondary mt-1 text-sm">
          Track your session earnings, commissions, and upcoming payouts.
        </p>
      </div>

      <TrainerEarningsKPIs />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrainerEarningsHistory />
        </div>
        <div className="lg:col-span-1">
          <TrainerEarningsPending />
        </div>
      </div>
    </div>
  );
}
