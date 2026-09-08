'use client';

import { UserPlus, Calendar, Star, Users } from 'lucide-react';
import type { PerformanceAggregates } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

interface AdminHrPerformanceKPIsProps {
  aggregates: PerformanceAggregates;
}

export default function AdminHrPerformanceKPIs({ aggregates }: AdminHrPerformanceKPIsProps) {
  const kpis = [
    {
      label: 'Total Sessions',
      value: aggregates.totalSessions.toString(),
      icon: Calendar,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
    {
      label: 'Members Added',
      value: aggregates.totalMembersAdded.toString(),
      icon: UserPlus,
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
    },
    {
      label: 'Avg Attendance',
      value: `${aggregates.avgAttendance.toFixed(1)}%`,
      icon: Users,
      iconColor: 'text-info',
      iconBg: 'bg-info/10',
    },
    {
      label: 'Avg Rating',
      value: aggregates.avgRating.toFixed(1),
      icon: Star,
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
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
              <p className="text-2xl font-black text-foreground">{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
