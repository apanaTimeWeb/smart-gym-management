'use client';
// RESPONSIBILITY: Renders the TrainerEarningsKPIs UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { useLocale } from 'next-intl';
import { formatCurrency } from '@/app/trainer/trainer_layout/trainer_utils/TrainerFormatCurrency';
import { IndianRupee, Clock, Activity, Target, Minus } from 'lucide-react';
import { useTrainerEarningsQuery } from '@/app/trainer/earnings/earnings_queries/useTrainerEarningsQuery';
import { formatNumber } from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function TrainerEarningsKPIs() {
  const locale = useLocale();
  const { data } = useTrainerEarningsQuery();
  const kpis = data?.kpis;
  const dateSuffix = useDateRangeSuffix();

  if (!kpis) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={`skeleton-${i}`} className="h-28 bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: 'Total Earnings' + dateSuffix, value: formatCurrency(kpis.totalEarnings, 'INR', locale), icon: IndianRupee, color: 'text-success', bg: 'bg-success-bg' },
    { label: 'Pending Payouts' + dateSuffix, value: formatCurrency(kpis.pendingPayouts, 'INR', locale), icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
    { label: 'Sessions Completed' + dateSuffix, value: formatNumber(kpis.sessionsCompleted), icon: Activity, color: 'text-info', bg: 'bg-info-bg' },
    { label: 'Commission Rate' + dateSuffix, value: `${kpis.commissionRate}%`, icon: Target, color: 'text-primary', bg: 'bg-primary-subtle' },
    { label: 'Tax Deducted (TDS)' + dateSuffix, value: formatCurrency(kpis.taxDeduction, 'INR', locale), icon: Minus, color: 'text-danger', bg: 'bg-danger-bg' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map(c => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between hover:border-primary motion-safe:transition-colors motion-safe:duration-base">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium text-secondary uppercase tracking-wider">{c.label}</p>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.bg}`}>
                <Icon size={18} className={c.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary mt-4">{c.value}</p>
          </div>
        );
      })}
    </div>
  );
}
