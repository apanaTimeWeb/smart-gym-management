// RESPONSIBILITY: Renders the Onboarding Stats Bar component and its associated UI logic.
'use client';
import { useSuperadminDateRangeSuffix } from '@/app/superadmin/superadmin_components/SuperadminShared/useSuperadminDateRangeSuffix';
import type { SuperadminOnboardingStatsBarProps } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingStatsBarTypes';
export function SuperadminOnboardingStatsBar({ stats }: SuperadminOnboardingStatsBarProps) {
    const dateSuffix = useSuperadminDateRangeSuffix();
    const statCards = [
        { label: 'Total Signups', value: stats.total, color: 'text-primary' },
        { label: 'Completed', value: stats.completed, color: 'text-success' },
        { label: 'In Progress', value: stats.inProgress, color: 'text-primary' },
        { label: 'Stalled', value: stats.stalled, color: 'text-danger' },
        { label: 'On Trial', value: stats.trial, color: 'text-warning' },
    ];
    return (<div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {statCards.map((s) => (<div key={s.label} className="bg-card border border-border rounded-xl p-4 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">{s.label}{dateSuffix}</p>
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
        </div>))}
    </div>);
}
