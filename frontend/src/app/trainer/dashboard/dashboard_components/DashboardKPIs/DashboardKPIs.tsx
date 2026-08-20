// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
'use client';

import { useDashboardContext } from '@/app/trainer/dashboard/dashboard_context/DashboardContext';
import TrainerStatCard from '@/app/trainer/trainer_components/TrainerShared/TrainerStatCard';
import { Users, TrendingUp, UserCheck } from 'lucide-react';

export default function DashboardKPIs() {
  const { stats } = useDashboardContext();
  if (!stats) return null;
  const s = stats;

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
          title="New Members (Month)"
          value={s.newMembersThisMonth.toLocaleString()}
          change="This month"
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
      </div>
    </>
  );
}
