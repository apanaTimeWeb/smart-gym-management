// RESPONSIBILITY: Renders the trainer's own monthly attendance summary stats.
// DATA FLOW: useAttendanceContext -> TrainerAttendanceSummaryCard
// Strictly view-only: shows Present, Absent, Weekly Off, Attendance % for the current month.
'use client';

import { useMemo } from 'react';
import { CheckCircle2, XCircle, Coffee, TrendingUp } from 'lucide-react';
import { useAttendanceContext } from '@/app/trainer/attendance/attendance_context/AttendanceContext';
import { getUser } from '@/lib/api';

export default function TrainerAttendanceSummaryCard() {
  const { records } = useAttendanceContext();
  const user = getUser();

  const summary = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const todayDate = now.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const presentDaysSet = new Set<number>();
    records.forEach(r => {
      if (!r.date) return;
      const d = new Date(r.date);
      if (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        r.type === 'STAFF' &&
        (!user?.id ||
          String(r.staffId) === String(user.id) ||
          String(r.staff?.id) === String(user.id))
      ) {
        presentDaysSet.add(d.getDate());
      }
    });

    let presentDays = 0;
    let absentDays = 0;
    let weeklyOffDays = 0;

    for (let day = 1; day <= Math.min(todayDate, daysInMonth); day++) {
      const isSunday = new Date(year, month, day).getDay() === 0;
      if (isSunday) {
        weeklyOffDays++;
      } else if (presentDaysSet.has(day)) {
        presentDays++;
      } else {
        absentDays++;
      }
    }

    const totalTracked = presentDays + absentDays;
    const attendancePct = totalTracked > 0 ? Math.round((presentDays / totalTracked) * 100) : 0;

    return { presentDays, absentDays, weeklyOffDays, attendancePct };
  }, [records, user]);

  const stats = [
    {
      label: 'Present This Month',
      value: String(summary.presentDays),
      unit: 'days',
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'Absent This Month',
      value: String(summary.absentDays),
      unit: 'days',
      icon: XCircle,
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
    {
      label: 'Weekly Off / Rest',
      value: String(summary.weeklyOffDays),
      unit: 'days',
      icon: Coffee,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'Attendance Rate',
      value: `${summary.attendancePct}%`,
      unit: '',
      icon: TrendingUp,
      color: summary.attendancePct >= 85 ? 'text-success' : 'text-danger',
      bg: summary.attendancePct >= 85 ? 'bg-success/10' : 'bg-danger/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(s => (
        <div
          key={s.label}
          className="bg-card rounded-xl p-4 shadow-sm border border-border flex items-center gap-3"
        >
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
            <s.icon size={19} className={s.color} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium leading-tight">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>
              {s.value}
              {s.unit && (
                <span className="text-xs text-secondary font-normal ml-1">{s.unit}</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
