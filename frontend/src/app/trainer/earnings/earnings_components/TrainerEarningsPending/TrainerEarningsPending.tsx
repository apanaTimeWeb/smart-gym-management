'use client';
// RESPONSIBILITY: Renders the TrainerEarningsPending UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { CalendarClock } from 'lucide-react';
import { useTrainerEarningsQuery } from '@/app/trainer/earnings/earnings_queries/useTrainerEarningsQuery';
import { PAYOUT_STATUS_STYLES } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';
import { formatCurrency } from '@/lib/formatters';
import { formatDate } from '@/lib/formatters';

export default function TrainerEarningsPending() {
  const { data } = useTrainerEarningsQuery();
  const pendingPayouts = data?.pendingPayouts || [];

  if (!data) {
    return <div className="h-72 bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />;
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-header">
        <h2 className="text-base font-semibold text-foreground">Upcoming Payouts</h2>
        <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-semibold motion-safe:transition-colors">
          Request Payout
        </button>
      </div>
      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-4">
        {pendingPayouts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <CalendarClock size={32} className="text-secondary/50 mb-3" />
            <p className="text-sm font-semibold text-foreground">No pending payouts</p>
            <p className="text-xs text-secondary mt-1">You are all caught up!</p>
          </div>
        ) : (
          pendingPayouts.map(p => {
            const style = PAYOUT_STATUS_STYLES[p.status];
            return (
              <div key={p.id} className="p-4 rounded-xl border border-border bg-page flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(p.amount)}</p>
                    <p className="text-xs text-secondary mt-0.5">{p.period}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${style?.bg || 'bg-secondary/10'} ${style?.text || 'text-secondary'}`}>
                    {style?.label || p.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-secondary pt-3 border-t border-border">
                  <CalendarClock size={13} />
                  <span>Due by: {formatDate(p.dueDate)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
