"use client";

import { CalendarCheck, Users, UserCog } from 'lucide-react';
import { useAttendanceContext } from '../../attendance_context/AttendanceContext';

export default function AttendanceKPIs() {
  const { todayStats } = useAttendanceContext();

  const kpis = [
    { label: "Today's Check-ins", value: todayStats.totalCheckIns, icon: CalendarCheck, color: 'text-orange-600 dark:text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
    { label: 'Member Check-ins',  value: todayStats.memberCheckIns, icon: Users,        color: 'text-blue-600 dark:text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-950/30'   },
    { label: 'Staff Check-ins',   value: todayStats.staffCheckIns,  icon: UserCog,      color: 'text-green-600 dark:text-green-500',  bg: 'bg-green-50 dark:bg-green-950/30'  },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {kpis.map((s, i) => (
        <div key={i} className="bg-[var(--attendance-bg-card)] rounded-xl p-4 shadow-sm border border-[var(--attendance-border)] flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
            <s.icon size={19} className={s.color} />
          </div>
          <div>
            <p className="text-xs text-[var(--attendance-text-secondary)] font-medium">{s.label}</p>
            <p className="text-xl font-bold text-[var(--attendance-text-primary)]">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
