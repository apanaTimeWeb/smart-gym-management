// RESPONSIBILITY: KPI stat cards row for the Manager Reports module.
'use client';
import { TrendingUp, Users, CalendarCheck, TrendingDown, IndianRupee, UserPlus, UserMinus, Activity } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { formatNumber } from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { ManagerReportsKpiCard } from '@/app/manager/reports/reports_components/ManagerReportsKPIs/ManagerReportsKpiCard/ManagerReportsKpiCard';
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
import { useLocale } from "next-intl";

const formatReportCurrency = (value: number) => {
  const locale = useLocale();
  return formatCurrency(value, ManagerEnvConfig.currencyCode, locale);
};

export default function ManagerReportsKPIs() {
  const { summary } = useManagerReportsLogic();
  const dateSuffix = useDateRangeSuffix();
  const k = summary?.kpis;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerReportsKpiCard label={`Total Income${dateSuffix}`}    value={k ? formatReportCurrency(k.totalRevenue)    : '—'} icon={TrendingUp}   iconBg="bg-success-bg"   iconColor="text-success"   sub={k ? `Net: ${formatReportCurrency(k.netProfit)}` : undefined} subColor="text-success" />
      <ManagerReportsKpiCard label={`Total Expenses${dateSuffix}`}   value={k ? formatReportCurrency(k.totalExpenses)   : '—'} icon={TrendingDown} iconBg="bg-danger-bg"    iconColor="text-danger"    />
      <ManagerReportsKpiCard label={`Active Members${dateSuffix}`}   value={k ? formatNumber(k.activeMembers): '—'} icon={Users}        iconBg="bg-info-bg"      iconColor="text-info"      sub={k ? `+${k.newMembersThisMonth} this month` : undefined} subColor="text-success" />
      <ManagerReportsKpiCard label={`Avg Attendance${dateSuffix}`}   value={k ? `${k.avgAttendanceRate}%` : '—'} icon={CalendarCheck} iconBg="bg-primary-subtle" iconColor="text-primary" />
      <ManagerReportsKpiCard label={`New Members${dateSuffix}`}      value={k ? formatNumber(k.newMembersThisMonth) : '—'} icon={UserPlus}  iconBg="bg-success-bg"  iconColor="text-success"  />
      <ManagerReportsKpiCard label={`Members Lost %${dateSuffix}`}       value={k ? `${k.churnRate}%`      : '—'} icon={UserMinus}    iconBg="bg-warning-bg"   iconColor="text-warning"   />
      <ManagerReportsKpiCard label={`Total Members${dateSuffix}`}    value={k ? formatNumber(k.totalMembers) : '—'} icon={Activity}     iconBg="bg-purple-bg"    iconColor="text-purple-text"    />
      <ManagerReportsKpiCard label={`Net Profit${dateSuffix}`}       value={k ? formatReportCurrency(k.netProfit)       : '—'} icon={IndianRupee}  iconBg="bg-success-bg"   iconColor="text-success"   />
    </div>
  );
}
