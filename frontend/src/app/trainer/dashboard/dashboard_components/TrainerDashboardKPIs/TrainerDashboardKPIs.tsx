// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
'use client';

import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import TrainerStatCard from '@/app/trainer/trainer_components/TrainerShared/TrainerStatCard';
import { Users, UserCheck, CalendarCheck, Clock, Dumbbell, Activity, DollarSign, Star, CalendarClock, TrendingUp } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import { formatCurrency } from '@/app/trainer/dashboard/dashboard_utils/DashboardSharedConstants';

export default function TrainerDashboardKPIs() {
  const { data: stats } = useTrainerDashboardQuery();
  const dateSuffix = useDateRangeSuffix();
  
  if (!stats) return null;
  const s = stats;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <TrainerStatCard
          title={`Today's Sessions${dateSuffix}`}
          value={s.todaysSessions.toLocaleString()}
          change={`${s.completedSessions}/${s.todaysSessions} Completed`}
          changeType="neutral"
          icon={Clock}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <TrainerStatCard
          title={`My Members${dateSuffix}`}
          value={s.myMembersCount.toLocaleString()}
          change="Assigned to you"
          changeType="neutral"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <TrainerStatCard
          title={`Today's Attendance${dateSuffix}`}
          value={s.todaysAttendance.toLocaleString()}
          change="Members present today"
          changeType="neutral"
          icon={CalendarCheck}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <TrainerStatCard
          title={`Pending Plans${dateSuffix}`}
          value={s.pendingWorkoutPlans.toLocaleString()}
          change="Workout plans to create"
          changeType="down"
          icon={Dumbbell}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <TrainerStatCard
          title={`Total PT Revenue${dateSuffix}`}
          value={formatCurrency(s.totalPTRevenue ?? 0)}
          change="This month"
          changeType="neutral"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <TrainerStatCard
          title={`Weekly Sessions${dateSuffix}`}
          value={s.weeklySessionsCompleted?.toLocaleString() ?? '0'}
          change="Completed"
          changeType="neutral"
          icon={Activity}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <TrainerStatCard
          title={`Avg Session Rating${dateSuffix}`}
          value={s.avgSessionRating?.toFixed(1) ?? '0.0'}
          change="Out of 5.0"
          changeType="neutral"
          icon={Star}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <TrainerStatCard
          title={`Active Clients${dateSuffix}`}
          value={s.activeClientsCount?.toLocaleString() ?? '0'}
          change="Currently active"
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <TrainerStatCard
          title={`Attendance Rate${dateSuffix}`}
          value={`${s.attendanceRate ?? 0}%`}
          change="Average attendance"
          changeType="neutral"
          icon={TrendingUp}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <TrainerStatCard
          title={`Next Session${dateSuffix}`}
          value={s.nextSessionTime ?? 'N/A'}
          change="Upcoming"
          changeType="neutral"
          icon={CalendarClock}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
      </div>
    </>
  );
}

