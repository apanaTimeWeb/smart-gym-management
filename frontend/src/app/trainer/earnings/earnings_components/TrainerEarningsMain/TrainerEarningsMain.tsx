'use client';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useTrainerEarningsQuery } from '@/app/trainer/earnings/earnings_queries/useTrainerEarningsQuery';
import TrainerEarningsKPIs from '@/app/trainer/earnings/earnings_components/TrainerEarningsKPIs/TrainerEarningsKPIs';
import TrainerEarningsPending from '@/app/trainer/earnings/earnings_components/TrainerEarningsPending/TrainerEarningsPending';
import TrainerEarningsHistory from '@/app/trainer/earnings/earnings_components/TrainerEarningsHistory/TrainerEarningsHistory';
import { TrainerDateFilterDropdown } from '@/app/trainer/trainer_components/TrainerShared/TrainerDateFilterDropdown';

export default function TrainerEarningsMain() {
  const { isLoading, isError, error } = useTrainerEarningsQuery();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-danger/10 border border-danger rounded-xl p-4 flex items-center gap-3 text-danger max-w-md">
          <AlertCircle size={24} />
          <div>
            <p className="font-bold">Failed to load earnings data</p>
            <p className="text-sm mt-1">{error?.message || 'Please try again later.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Earnings</h1>
          <TrainerDateFilterDropdown />
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
    </div>
  );
}
