"use client";
import { formatPercent1dp, formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders the KPI summary row for the Reports module — total revenue, expenses, profit, members, attendance rate.

import { TrendingUp, TrendingDown, Users, IndianRupee, Activity, Wallet } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { useAdminReportsLogic } from '@/app/admin/reports/reports_context/useAdminReportsLogic';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminReportsKPIs() {
  const { reportData } = useAdminReportsLogic();
  const dateSuffix = useDateRangeSuffix();
  const kpis = reportData?.kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard
        title={`Total Income${dateSuffix}`}
        value={kpis ? formatCurrency(kpis.totalRevenue) : '—'}
        change="vs last period"
        changeType="up"
        icon={IndianRupee}
        iconBg="bg-primary/10"
        iconColor="text-primary"
      />
      <AdminStatCard
        title={`Net Profit${dateSuffix}`}
        value={kpis ? formatCurrency(kpis.netProfit) : '—'}
        change={kpis ? `${formatPercent1dp((kpis.netProfit / kpis.totalRevenue) * 100)} margin` : '—'}
        changeType="up"
        icon={TrendingUp}
        iconBg="bg-success/10"
        iconColor="text-success"
      />
      <AdminStatCard
        title={`Total Expenses${dateSuffix}`}
        value={kpis ? formatCurrency(kpis.totalExpenses) : '—'}
        change="across all gyms"
        changeType="neutral"
        icon={TrendingDown}
        iconBg="bg-danger/10"
        iconColor="text-danger"
      />
      <AdminStatCard
        title={`Total Members${dateSuffix}`}
        value={kpis ? kpis.totalMembers.toLocaleString('en-IN') : '—'}
        change={kpis ? `+${kpis.newMembers} new` : '—'}
        changeType="up"
        icon={Users}
        iconBg="bg-info/10"
        iconColor="text-info"
      />
      <AdminStatCard
        title={`Total Payroll${dateSuffix}`}
        value={kpis ? formatCurrency(kpis.totalPayroll) : '—'}
        change="this period"
        changeType="neutral"
        icon={Wallet}
        iconBg="bg-purple/10"
        iconColor="text-purple"
      />
      <AdminStatCard
        title={`Avg Attendance Rate${dateSuffix}`}
        value={kpis ? `${kpis.avgAttendanceRate}%` : '—'}
        change="across all gyms"
        changeType="up"
        icon={Activity}
        iconBg="bg-success/10"
        iconColor="text-success"
      />
    </div>
  );
}