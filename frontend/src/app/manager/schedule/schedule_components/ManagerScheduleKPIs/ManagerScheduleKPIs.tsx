// RESPONSIBILITY: Renders the 4 KPI stat cards for the Schedule module (total trainers, on duty today, on leave, shifts this week).
'use client';
import { Users, UserCheck, UserX, CalendarDays } from 'lucide-react';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { useScheduleContext } from '@/app/manager/schedule/schedule_context/ManagerScheduleContext';

export default function ManagerScheduleKPIs() {
  const { kpis, fetchState } = useScheduleContext();

  if (fetchState === 'loading' || !kpis) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard
        title="Total Trainers"
        value={kpis.totalTrainers}
        icon={Users}
        iconBg="rgba(250,204,21,0.12)"
        iconColor="var(--primary)"
      />
      <ManagerStatCard
        title="On Duty Today"
        value={kpis.trainersOnDutyToday}
        icon={UserCheck}
        iconBg="rgba(34,197,94,0.12)"
        iconColor="var(--success)"
      />
      <ManagerStatCard
        title="On Leave Today"
        value={kpis.trainersOnLeaveToday}
        icon={UserX}
        iconBg="rgba(245,158,11,0.12)"
        iconColor="var(--warning)"
      />
      <ManagerStatCard
        title="Shifts This Week"
        value={kpis.totalShiftsThisWeek}
        icon={CalendarDays}
        iconBg="rgba(59,130,246,0.12)"
        iconColor="var(--info)"
      />
    </div>
  );
}
