"use client";
import { formatPercent1dp, formatDecimal } from '@/lib/formatters';
// RESPONSIBILITY: Renders the top-level KPI cards for the Performance Dashboard.

import { UserPlus, Calendar, Star, Users } from 'lucide-react';
import type { PerformanceAggregates } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

import type { AdminHrPerformanceKPIsProps } from '@/app/admin/hr/hr_types/AdminHrPerformanceKPIsPropsTypes';


export default function AdminHrPerformanceKPIs({ aggregates }: AdminHrPerformanceKPIsProps) {
  const kpis = [
    {
      label: 'Total Sessions',
      value: aggregates.totalSessions.toLocaleString('en-IN'),
      icon: Calendar,
      iconColor: 'text-primary',
      iconBg: 'bg-primary-subtle',
    },
    {
      label: 'Members Added',
      value: aggregates.totalMembersAdded.toLocaleString('en-IN'),
      icon: UserPlus,
      iconColor: 'text-success',
      iconBg: 'bg-success-bg',
    },
    {
      label: 'Avg Attendance',
      value: `${formatPercent1dp(aggregates.avgAttendance)}%`,
      icon: Users,
      iconColor: 'text-info',
      iconBg: 'bg-info-bg',
    },
    {
      label: 'Avg Rating',
      value: formatDecimal(aggregates.avgRating),
      icon: Star,
      iconColor: 'text-warning',
      iconBg: 'bg-warning-bg',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className={`bg-card border border-border rounded-xl p-5 flex items-center gap-4`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
              <Icon size={24} strokeWidth={2} className={kpi.iconColor} />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className="text-2xl font-black text-primary">{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}