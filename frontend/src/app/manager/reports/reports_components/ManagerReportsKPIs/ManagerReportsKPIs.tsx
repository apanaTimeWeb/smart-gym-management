'use client';
// RESPONSIBILITY: KPI stat cards row for the Manager Reports module.
import { useReportsContext } from '@/app/manager/reports/reports_context/ManagerReportsContext';
import { TrendingUp, Users, CalendarCheck, TrendingDown, IndianRupee, UserPlus, UserMinus, Activity } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

const fmt = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

interface KPICardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  sub?: string;
  subColor?: string;
}

function KPICard({ label, value, icon: Icon, iconBg, iconColor, sub, subColor }: KPICardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
        {sub && <p className={`text-xs mt-0.5 ${subColor ?? 'text-secondary'}`}>{sub}</p>}
      </div>
    </div>
  );
}

export default function ManagerReportsKPIs() {
  const { summary } = useReportsContext();
  const dateSuffix = useDateRangeSuffix();
  const k = summary?.kpis;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <KPICard label={`Total Income${dateSuffix}`}    value={k ? fmt(k.totalRevenue)    : '—'} icon={TrendingUp}   iconBg="bg-success/10"   iconColor="text-success"   sub={k ? `Net: ${fmt(k.netProfit)}` : undefined} subColor="text-success" />
      <KPICard label={`Total Expenses${dateSuffix}`}   value={k ? fmt(k.totalExpenses)   : '—'} icon={TrendingDown} iconBg="bg-danger/10"    iconColor="text-danger"    />
      <KPICard label={`Active Members${dateSuffix}`}   value={k ? String(k.activeMembers): '—'} icon={Users}        iconBg="bg-info/10"      iconColor="text-info"      sub={k ? `+${k.newMembersThisMonth} this month` : undefined} subColor="text-success" />
      <KPICard label={`Avg Attendance${dateSuffix}`}   value={k ? `${k.avgAttendanceRate}%` : '—'} icon={CalendarCheck} iconBg="bg-primary/10" iconColor="text-primary" />
      <KPICard label={`New Members${dateSuffix}`}      value={k ? String(k.newMembersThisMonth) : '—'} icon={UserPlus}  iconBg="bg-success/10"  iconColor="text-success"  />
      <KPICard label={`Members Lost %${dateSuffix}`}       value={k ? `${k.churnRate}%`      : '—'} icon={UserMinus}    iconBg="bg-warning/10"   iconColor="text-warning"   />
      <KPICard label={`Total Members${dateSuffix}`}    value={k ? String(k.totalMembers) : '—'} icon={Activity}     iconBg="bg-purple-bg"    iconColor="text-purple"    />
      <KPICard label={`Net Profit${dateSuffix}`}       value={k ? fmt(k.netProfit)       : '—'} icon={IndianRupee}  iconBg="bg-success/10"   iconColor="text-success"   />
    </div>
  );
}
