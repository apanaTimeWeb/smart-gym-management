"use client";
// RESPONSIBILITY: KPI stat cards for the Admin Attendance module.
import { Users, UserCheck, Briefcase, Calendar } from "lucide-react";
import { useAdminAttendanceContext } from "@/app/admin/attendance/attendance_context/AdminAttendanceContext";

export default function AdminAttendanceKPIs() {
  const { stats, loading } = useAdminAttendanceContext();
  const cards = [
    { label: "Today Total",   value: stats?.todayTotal ?? 0,   icon: Calendar,   color: "text-primary",  bg: "bg-primary/10" },
    { label: "Members In",    value: stats?.todayMembers ?? 0,  icon: Users,      color: "text-success",  bg: "bg-success-bg" },
    { label: "Staff In",      value: stats?.todayStaff ?? 0,    icon: Briefcase,  color: "text-info",     bg: "bg-info-bg"    },
    { label: "This Month",    value: stats?.monthTotal ?? 0,    icon: UserCheck,  color: "text-warning",  bg: "bg-warning-bg" },
  ];
  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{cards.map((_,i) => <div key={i} className="h-24 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}><Icon className={`w-5 h-5 ${color}`} /></div>
          <div><p className="text-xs text-text-secondary font-medium uppercase tracking-wide">{label}</p><p className={`text-2xl font-bold ${color}`}>{value}</p></div>
        </div>
      ))}
    </div>
  );
}
