'use client';
// RESPONSIBILITY: Side-by-side comparison table for multiple members' progress snapshots.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressComparisonTable
// Read-only — no edit/delete actions. Trend badge derived from snapshot.trend.

import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import type { ComparisonMemberSnapshot } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

interface Props {
  snapshots: ComparisonMemberSnapshot[];
}

const TREND_CONFIG = {
  improving:   { label: 'Improving',   icon: TrendingUp,   cls: 'bg-success-bg text-success border-success/20' },
  plateau:     { label: 'Plateau',      icon: Minus,        cls: 'bg-warning-bg text-warning border-warning/20' },
  declining:   { label: 'Declining',    icon: TrendingDown, cls: 'bg-danger-bg text-danger border-danger/20'   },
  insufficient:{ label: 'Insufficient', icon: AlertCircle,  cls: 'bg-input text-secondary border-border'       },
} as const;

function Delta({ value, lowerIsBetter }: { value: number | null; lowerIsBetter: boolean }) {
  if (value === null) return <span className="text-secondary">—</span>;
  const positive = lowerIsBetter ? value < 0 : value > 0;
  const neutral = value === 0;
  const sign = value > 0 ? '+' : '';
  return (
    <span className={neutral ? 'text-secondary' : positive ? 'text-success font-semibold' : 'text-danger font-semibold'}>
      {sign}{value}
    </span>
  );
}

export default function TrainerProgressComparisonTable({ snapshots }: Props) {
  if (snapshots.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center text-sm text-secondary">
        No members selected for comparison.
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Member Comparison — Latest Snapshot</h3>
        <p className="text-xs text-secondary mt-0.5">Δ = change from first to latest entry</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-input">
              {['Member', 'Trend', 'Weight (kg)', 'BMI', 'Body Fat %', 'Muscle Mass (kg)', 'Δ Weight', 'Δ Muscle', 'Entries'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {snapshots.map(s => {
              const trend = TREND_CONFIG[s.trend];
              const TrendIcon = trend.icon;
              return (
                <tr key={s.memberId} className="hover:bg-input/50 motion-safe:transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {s.memberName.charAt(0)}
                      </div>
                      {s.memberName}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${trend.cls}`}>
                      <TrendIcon size={11} />
                      {trend.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{s.latestWeightKg ?? '—'}</td>
                  <td className="px-4 py-3 text-foreground">{s.latestBmi ?? '—'}</td>
                  <td className="px-4 py-3 text-foreground">{s.latestBodyFatPercent != null ? `${s.latestBodyFatPercent}%` : '—'}</td>
                  <td className="px-4 py-3 text-foreground">{s.latestMuscleMassKg ?? '—'}</td>
                  <td className="px-4 py-3"><Delta value={s.weightChangeKg} lowerIsBetter={true} /></td>
                  <td className="px-4 py-3"><Delta value={s.muscleMassChange} lowerIsBetter={false} /></td>
                  <td className="px-4 py-3 text-secondary">{s.totalEntries}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
