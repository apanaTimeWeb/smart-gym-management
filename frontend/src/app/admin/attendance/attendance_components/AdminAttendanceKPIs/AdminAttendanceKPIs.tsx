// RESPONSIBILITY: Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg.
'use client';

import { CalendarCheck, UserCheck, Clock, TrendingUp } from 'lucide-react';
import { useAdminAttendanceLogic } from '@/app/admin/attendance/attendance_context/useAdminAttendanceLogic';

export default function AdminAttendanceKPIs() {
  const { summary } = useAdminAttendanceLogic();
  if (!summary) return null;

  const trendPositive = summary.trendVsLastWeek >= 0;

  const cards = [
    {
      title: "Today's Check-Ins",
      value: summary.todayTotal.toLocaleString('en-IN'),
      sub: `Peak: ${summary.peakHour}`,
      subColor: 'text-secondary',
      icon: CalendarCheck,
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary',
    },
    {
      title: 'Present Today',
      value: summary.todayPresent.toLocaleString('en-IN'),
      sub: `${Math.round((summary.todayPresent / summary.todayTotal) * 100)}% attendance rate`,
      subColor: 'text-success',
      icon: UserCheck,
      iconBg: 'bg-success/20',
      iconColor: 'text-success',
    },
    {
      title: 'Late Arrivals',
      value: summary.todayLate.toLocaleString('en-IN'),
      sub: `${Math.round((summary.todayLate / summary.todayTotal) * 100)}% of today's check-ins`,
      subColor: 'text-warning',
      icon: Clock,
      iconBg: 'bg-warning/20',
      iconColor: 'text-warning',
    },
    {
      title: 'Weekly Average',
      value: summary.weeklyAverage.toLocaleString('en-IN'),
      sub: `${trendPositive ? '↑' : '↓'} ${Math.abs(summary.trendVsLastWeek)}% vs last week`,
      subColor: trendPositive ? 'text-success' : 'text-danger',
      icon: TrendingUp,
      iconBg: 'bg-info/20',
      iconColor: 'text-info',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="bg-card rounded-xl p-5 border border-border hover:border-primary motion-safe:transition-all motion-safe:duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-secondary uppercase tracking-wider">{c.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{c.value}</p>
                <p className={`text-xs mt-1 font-medium ${c.subColor}`}>{c.sub}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${c.iconBg}`}>
                <Icon size={18} strokeWidth={2} className={c.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
