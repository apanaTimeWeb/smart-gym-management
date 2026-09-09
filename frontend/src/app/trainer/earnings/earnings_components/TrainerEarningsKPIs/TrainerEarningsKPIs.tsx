'use client';
import { IndianRupee, Clock, Activity, Target } from 'lucide-react';
import { useTrainerEarningsContext } from '@/app/trainer/earnings/earnings_context/TrainerEarningsContext';

export default function TrainerEarningsKPIs() {
  const { kpis, fetchState } = useTrainerEarningsContext();

  if (fetchState === 'loading' || !kpis) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: 'Total Earnings', value: `₹${kpis.totalEarnings.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pending Payouts', value: `₹${kpis.pendingPayouts.toLocaleString('en-IN')}`, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Sessions Completed', value: kpis.sessionsCompleted.toString(), icon: Activity, color: 'text-info', bg: 'bg-info/10' },
    { label: 'Commission Rate', value: `${kpis.commissionRate}%`, icon: Target, color: 'text-primary', bg: 'bg-primary-subtle' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between hover:border-primary/50 motion-safe:transition-colors">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-medium text-secondary uppercase tracking-wider">{c.label}</p>
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
