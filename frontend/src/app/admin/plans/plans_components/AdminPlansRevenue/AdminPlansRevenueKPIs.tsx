"use client";
// RESPONSIBILITY: Renders KPI cards for the Plan Revenue dashboard.

import { IndianRupee, Users, TrendingUp, Award } from 'lucide-react';
import type { RevenueAggregates } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import {formatKPI, formatPercent1dp, formatNumber} from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminPlansRevenueKPIs({ aggregates }: { aggregates: RevenueAggregates }) {
  const dateSuffix = useDateRangeSuffix();
  const kpis = [
    {
      label: 'Total Revenue' + dateSuffix,
      value: formatKPI(aggregates.totalRevenue),
      icon: IndianRupee,
      iconColor: 'text-primary',
      iconBg: 'bg-primary-subtle',
    },
    {
      label: 'Total Subscriptions' + dateSuffix,
      value: formatNumber(aggregates.totalSubscriptions),
      icon: Users,
      iconColor: 'text-success',
      iconBg: 'bg-success-bg',
    },
    {
      label: 'Avg Renewal Rate' + dateSuffix,
      value: `${formatPercent1dp(aggregates.avgRenewalRate)}%`,
      icon: TrendingUp,
      iconColor: 'text-info',
      iconBg: 'bg-info-bg',
    },
    {
      label: 'Top Performing Plan' + dateSuffix,
      value: aggregates.topPerformingPlanName,
      icon: Award,
      iconColor: 'text-warning',
      iconBg: 'bg-warning-bg',
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
              <p className="text-2xl font-black text-primary truncate" title={kpi.value.toString()}>{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}