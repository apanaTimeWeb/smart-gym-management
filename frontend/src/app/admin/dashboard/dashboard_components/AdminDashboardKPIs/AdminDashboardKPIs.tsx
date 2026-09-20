"use client";
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from AdminDashboardContext.

import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';
import AdminStatCard from '@/app/admin/admin_layout/AdminShared/AdminStatCard';
import { formatCurrency } from '@/lib/formatters';
import { Users, DollarSign, TrendingUp, AlertCircle, Clock, UserCheck } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminDashboardKPIs() {
  const { stats } = useAdminDashboardLogic();
  const dateSuffix = useDateRangeSuffix();
  
  if (!stats) return null;
  
  const s = stats;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
      <AdminStatCard
        title={`Avg. Attendance/Day${dateSuffix}`}
        value={(s.avgAttendance ?? 0).toLocaleString()}
        change="This month"
        changeType="up"
        icon={Users}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <AdminStatCard
        title={`Renewals Pending${dateSuffix}`}
        value={(s.renewalsPending ?? 0).toLocaleString()}
        change="Next 7 days"
        changeType="down"
        icon={Clock}
        iconBg="bg-warning-bg"
        iconColor="text-warning"
      />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard
        title={`Total Income${dateSuffix}`}
        value={formatCurrency(s.totalRevenue || 0)}
        change="All Time"
        changeType="neutral"
        icon={DollarSign}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <AdminStatCard
        title={`Net Profit${dateSuffix}`}
        value={formatCurrency(s.netProfit || 0)}
        change="All Time"
        changeType="up"
        icon={TrendingUp}
        iconBg="bg-success-bg"
        iconColor="text-success"
      />
      <AdminStatCard
        title={`Active Members${dateSuffix}`}
        value={(s.activeMembers || 0).toLocaleString()}
        change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% capacity`}
        changeType="neutral"
        icon={UserCheck}
        iconBg="bg-info-bg"
        iconColor="text-info"
      />
      <AdminStatCard
        title={`Total Outstanding${dateSuffix}`}
        value={formatCurrency(s.pendingPayments || 0)}
        change={`${s.membersByStatus?.pending || 0} members due`}
        changeType="down"
        icon={AlertCircle}
        iconBg="bg-danger-bg"
        iconColor="text-danger"
      />
    </div>
    </>
  );
}