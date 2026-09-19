'use client';
// RESPONSIBILITY: Renders the top KPI stat cards for the Attendance module (total, member, staff check-ins).
// DATA FLOW: props (from useAttendanceStatsQuery via TrainerAttendanceMain) → display only
import { CalendarCheck, Users, UserCheck } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import type { AttendanceStats } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';
import type { TrainerAttendanceKPIsProps } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceKPIsProps';



export default function TrainerAttendanceKPIs({ stats }: TrainerAttendanceKPIsProps) {
  const dateSuffix = useDateRangeSuffix();

  const kpis = [
    { label: "Today's Check-ins" + dateSuffix, value: stats.totalCheckIns, icon: CalendarCheck, color: 'text-warning', bg: 'bg-warning-bg' },
    { label: 'Member Check-ins' + dateSuffix, value: stats.memberCheckIns, icon: Users, color: 'text-info', bg: 'bg-info-bg' },
    { label: 'Staff Check-ins' + dateSuffix, value: stats.staffCheckIns, icon: UserCheck, color: 'text-success', bg: 'bg-success-bg' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Today attendance KPIs">
      {kpis.map((s) => (
        <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
            <s.icon size={19} className={s.color} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{s.label}</p>
            <p className="text-xl font-bold text-primary">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
