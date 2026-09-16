'use client';
// RESPONSIBILITY: Renders the TrainerEarningsKPIs UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { IndianRupee, Clock, Activity, Target, Minus } from 'lucide-react';
import { useTrainerEarningsQuery } from '@/app/trainer/earnings/earnings_queries/useTrainerEarningsQuery';
import { formatCurrency } from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function TrainerEarningsKPIs() {
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
    { label: 'Total Earnings' + dateSuffix, value: formatCurrency(kpis.totalEarnings), icon: IndianRupee, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pending Payouts' + dateSuffix, value: formatCurrency(kpis.pendingPayouts), icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Sessions Completed' + dateSuffix, value: kpis.sessionsCompleted.toString(), icon: Activity, color: 'text-info', bg: 'bg-info/10' },
    { label: 'Commission Rate' + dateSuffix, value: `${kpis.commissionRate}%`, icon: Target, color: 'text-primary', bg: 'bg-primary-subtle' },
    { label: 'Tax Deducted (TDS)' + dateSuffix, value: formatCurrency(kpis.taxDeduction), icon: Minus, color: 'text-danger', bg: 'bg-danger/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map(c => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between hover:border-primary/50 motion-safe:transition-colors">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium text-secondary uppercase tracking-wider">{c.label}</p>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.bg}`}>
                <Icon size={16} className={c.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mt-4">{c.value}</p>
          </div>
        );
      })}
    </div>
  );
}
