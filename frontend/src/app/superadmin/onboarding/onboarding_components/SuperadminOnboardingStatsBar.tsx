'use client';

import { KPI_CARD_GRADIENT } from '@/app/superadmin/onboarding/onboarding_types/onboarding_constants';
import { useDateRangeSuffix } from '@/components/ui/SuperadminShared/useDateRangeSuffix';

export function SuperadminOnboardingStatsBar({
  stats,
}: {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    stalled: number;
    trial: number;
  };
}) {
  const dateSuffix = useDateRangeSuffix();

  const statCards = [
    { label: 'Total Signups', value: stats.total, color: 'text-foreground' },
    { label: 'Completed', value: stats.completed, color: 'text-success' },
    { label: 'In Progress', value: stats.inProgress, color: 'text-primary' },
    { label: 'Stalled', value: stats.stalled, color: 'text-danger' },
    { label: 'On Trial', value: stats.trial, color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {statCards.map((s) => (
        <div
          key={s.label}
          className="bg-card border border-border rounded-xl p-4 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
          style={{ background: KPI_CARD_GRADIENT }}
        >
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">{s.label}{dateSuffix}</p>
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
