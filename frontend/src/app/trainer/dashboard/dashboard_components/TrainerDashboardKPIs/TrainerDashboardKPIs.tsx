// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
'use client';

import { useDashboardContext } from '@/app/trainer/dashboard/dashboard_context/DashboardContext';
import TrainerStatCard from '@/app/trainer/trainer_components/TrainerShared/TrainerStatCard';
import { Users, TrendingUp, UserCheck } from 'lucide-react';

export default function TrainerDashboardKPIs() {
  const { stats, timeRange } = useDashboardContext();
  if (!stats) return null;
  const s = stats;

  const multiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const timeLabel = timeRange === 'weekly' ? 'This week' : timeRange === 'yearly' ? 'This year' : timeRange === 'custom' ? 'Selected range' : 'This month';
  const memLabel = timeRange === 'weekly' ? 'New Members (Week)' : timeRange === 'yearly' ? 'New Members (Year)' : timeRange === 'custom' ? 'New Members (Custom)' : 'New Members (Month)';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <TrainerStatCard
          title="Total Members"
          value={s.totalMembers.toLocaleString()}
          change="All time"
          changeType="up"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <TrainerStatCard
          title="Active Members"
          value={s.activeMembers.toLocaleString()}
          change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% of total`}
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <TrainerStatCard
          title={memLabel}
          value={Math.round(s.newMembersThisMonth * multiplier).toLocaleString()}
          change={timeLabel}
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
      </div>
    </>
  );
}
