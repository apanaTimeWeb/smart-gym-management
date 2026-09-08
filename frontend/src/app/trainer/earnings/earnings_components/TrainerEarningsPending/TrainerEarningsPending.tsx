'use client';
import { CalendarClock } from 'lucide-react';
import { useTrainerEarningsLogic } from '@/app/trainer/earnings/earnings_context/useTrainerEarningsLogic';
import { PAYOUT_STATUS_STYLES } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';

export default function TrainerEarningsPending() {
  const { pendingPayouts, fetchState } = useTrainerEarningsLogic();

  if (fetchState === 'loading') {
    return <div className="h-[300px] bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />;
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-header">
        <h2 className="text-base font-semibold text-foreground">Upcoming Payouts</h2>
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
                    <p className="text-sm font-semibold text-foreground">₹{p.amount.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-secondary mt-0.5">{p.period}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-secondary pt-3 border-t border-border">
                  <CalendarClock size={13} />
                  <span>Due by: {new Date(p.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
