'use client';
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from the Dashboard TanStack Query response.
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import TrainerStatCard from '@/app/trainer/trainer_components/TrainerShared/TrainerStatCard';
import { Users, CalendarCheck, Clock, Dumbbell } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

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
          iconBg="bg-primary-subtle"
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
      </div>
    </>
  );
}

