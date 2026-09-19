'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: KPI stat cards row for the Manager Reports module.
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
import { TrendingUp, Users, CalendarCheck, TrendingDown, IndianRupee, UserPlus, UserMinus, Activity } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import { ManagerReportsKpiCard } from '@/app/manager/reports/reports_components/ManagerReportsKPIs/ManagerReportsKpiCard/ManagerReportsKpiCard';


const formatReportCurrency = (value: number) => formatCurrencyFromMinorUnits(value, ManagerEnvConfig.currencyCode);

export default function ManagerReportsKPIs() {
  const { summary } = useManagerReportsLogic();
  const dateSuffix = useDateRangeSuffix();
  const k = summary?.kpis;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerReportsKpiCard label={`Total Income${dateSuffix}`}    value={k ? formatReportCurrency(k.totalRevenue)    : '—'} icon={TrendingUp}   iconBg="bg-success/10"   iconColor="text-success"   sub={k ? `Net: ${formatReportCurrency(k.netProfit)}` : undefined} subColor="text-success" />
      <ManagerReportsKpiCard label={`Total Expenses${dateSuffix}`}   value={k ? formatReportCurrency(k.totalExpenses)   : '—'} icon={TrendingDown} iconBg="bg-danger/10"    iconColor="text-danger"    />
      <ManagerReportsKpiCard label={`Active Members${dateSuffix}`}   value={k ? formatNumber(k.activeMembers): '—'} icon={Users}        iconBg="bg-info/10"      iconColor="text-info"      sub={k ? `+${k.newMembersThisMonth} this month` : undefined} subColor="text-success" />
      <ManagerReportsKpiCard label={`Avg Attendance${dateSuffix}`}   value={k ? `${k.avgAttendanceRate}%` : '—'} icon={CalendarCheck} iconBg="bg-primary/10" iconColor="text-primary" />
      <ManagerReportsKpiCard label={`New Members${dateSuffix}`}      value={k ? formatNumber(k.newMembersThisMonth) : '—'} icon={UserPlus}  iconBg="bg-success/10"  iconColor="text-success"  />
      <ManagerReportsKpiCard label={`Members Lost %${dateSuffix}`}       value={k ? `${k.churnRate}%`      : '—'} icon={UserMinus}    iconBg="bg-warning/10"   iconColor="text-warning"   />
      <ManagerReportsKpiCard label={`Total Members${dateSuffix}`}    value={k ? formatNumber(k.totalMembers) : '—'} icon={Activity}     iconBg="bg-purple-bg"    iconColor="text-purple"    />
      <ManagerReportsKpiCard label={`Net Profit${dateSuffix}`}       value={k ? formatReportCurrency(k.netProfit)       : '—'} icon={IndianRupee}  iconBg="bg-success/10"   iconColor="text-success"   />
    </div>
  );
}
