// RESPONSIBILITY: Renders KPI cards for the Plan Revenue dashboard.
'use client';

import { IndianRupee, Users, TrendingUp, Award } from 'lucide-react';
import type { RevenueAggregates } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { formatKPI } from '@/lib/formatters';

export default function AdminPlansRevenueKPIs({ aggregates }: { aggregates: RevenueAggregates }) {
  const kpis = [
    {
      label: 'Total Revenue',
      value: formatKPI(aggregates.totalRevenue),
      icon: IndianRupee,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
    {
      label: 'Total Subscriptions',
      value: aggregates.totalSubscriptions.toLocaleString('en-IN'),
      icon: Users,
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
    },
    {
      label: 'Avg Renewal Rate',
      value: `${aggregates.avgRenewalRate.toFixed(1)}%`,
      icon: TrendingUp,
      iconColor: 'text-info',
      iconBg: 'bg-info/10',
    },
    {
      label: 'Top Performing Plan',
      value: aggregates.topPerformingPlanName,
      icon: Award,
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
              <Icon size={24} strokeWidth={2} className={kpi.iconColor} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 truncate">{kpi.label}</p>
              <p className="text-2xl font-black text-foreground truncate" title={kpi.value.toString()}>{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
