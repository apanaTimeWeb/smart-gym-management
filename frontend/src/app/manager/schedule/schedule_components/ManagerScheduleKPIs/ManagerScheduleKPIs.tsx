// RESPONSIBILITY: Renders the 4 KPI stat cards for the Schedule module (total trainers, on duty today, on leave, shifts this week).
'use client';
import { Users, UserCheck, UserX, CalendarDays } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { useManagerScheduleLogic } from '@/app/manager/schedule/schedule_hooks/ManagerUseManagerScheduleLogic';


export default function ManagerScheduleKPIs() {
  const { kpis, status } = useManagerScheduleLogic();
  const dateSuffix = useDateRangeSuffix();

  if (status === 'pending' || !kpis) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={`skeleton-${i}`} className="h-28 bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard
        title={`Total Trainers${dateSuffix}`}
        value={kpis.totalTrainers}
        icon={Users}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <ManagerStatCard
        title={`On Duty Today${dateSuffix}`}
        value={kpis.trainersOnDutyToday}
        icon={UserCheck}
        iconBg="bg-success-bg"
        iconColor="text-success"
      />
      <ManagerStatCard
        title={`On Leave Today${dateSuffix}`}
        value={kpis.trainersOnLeaveToday}
        icon={UserX}
        iconBg="bg-warning-bg"
        iconColor="text-warning"
      />
      <ManagerStatCard
        title={`Shifts This Week${dateSuffix}`}
        value={kpis.totalShiftsThisWeek}
        icon={CalendarDays}
        iconBg="bg-info-bg"
        iconColor="text-info"
      />
    </div>
  );
}
