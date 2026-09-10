'use client';

import { AlertCircle } from 'lucide-react';
import { TrainerEarningsProvider, useTrainerEarningsContext } from '@/app/trainer/earnings/earnings_context/TrainerEarningsContext';
import TrainerEarningsKPIs from '@/app/trainer/earnings/earnings_components/TrainerEarningsKPIs/TrainerEarningsKPIs';
import TrainerEarningsPending from '@/app/trainer/earnings/earnings_components/TrainerEarningsPending/TrainerEarningsPending';
import TrainerEarningsHistory from '@/app/trainer/earnings/earnings_components/TrainerEarningsHistory/TrainerEarningsHistory';
function TrainerEarningsContent() {
  const { fetchState, error } = useTrainerEarningsContext();

  if (fetchState === 'error') {
    return (
      <div className="p-6 bg-danger/10 border border-danger rounded-xl flex items-center gap-3 text-danger">
        <AlertCircle size={20} />
        <p className="text-sm font-medium">{error || 'Failed to load earnings data.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
            <div className="p-6 space-y-6">
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
    </div>
  );
}

export default function TrainerEarningsMain() {
  return (
    <TrainerEarningsProvider>
      <TrainerEarningsContent />
    </TrainerEarningsProvider>
  );
}
