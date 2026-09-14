'use client';
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/useManagerDashboardQueries';
import { useManagerDashboardStore } from '@/app/manager/dashboard/dashboard_store/useManagerDashboardStore';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { formatCurrency, formatKPI } from '@/lib/formatters';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart, Snowflake, TrendingDown, Target } from 'lucide-react';

export default function ManagerDashboardKPIs() {
  const { timeRange } = useManagerDashboardStore();
  const { data: stats } = useDashboardStatsQuery(timeRange);
  
  if (!stats) return null;
  const s = stats;

  const multiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const timeLabel = timeRange === 'weekly' ? 'This week' : timeRange === 'yearly' ? 'This year' : timeRange === 'custom' ? 'Selected range' : 'This month';
  const revLabel = timeRange === 'weekly' ? 'Weekly Revenue' : timeRange === 'yearly' ? 'Yearly Revenue' : timeRange === 'custom' ? 'Custom Revenue' : 'Monthly Revenue';
  const memLabel = timeRange === 'weekly' ? 'New Members (Week)' : timeRange === 'yearly' ? 'New Members (Year)' : timeRange === 'custom' ? 'New Members (Custom)' : 'New Members (Month)';
  const inqLabel = timeRange === 'weekly' ? 'New Inquiries (Week)' : timeRange === 'yearly' ? 'New Inquiries (Year)' : timeRange === 'custom' ? 'New Inquiries (Custom)' : 'New Inquiries (Month)';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ManagerStatCard
          title="Today's Members"
          value={formatKPI(s.activeMembers)}
          change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% of total`}
          changeType="neutral"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <ManagerStatCard
          title="Today's Collection"
          value={formatCurrency(s.monthlyRevenue * multiplier)}
          change="Daily revenue"
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <ManagerStatCard
          title="Trainer Attendance"
          value={s.trainerAttendance ? `${s.trainerAttendance.present}/${s.trainerAttendance.total}` : '0/0'}
          change="Present today"
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <ManagerStatCard
          title="Pending Dues"
          value={formatCurrency(s.pendingPayments)}
          change={`${s.membersByStatus?.pending || 0} members`}
          changeType="down"
          icon={AlertCircle}
          iconBg="bg-danger-bg"
          iconColor="text-danger"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <ManagerStatCard
          title="New Registrations"
          value={formatKPI(Math.round(s.newMembersThisMonth * multiplier))}
          change={timeLabel}
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <ManagerStatCard
          title="Today's Attendance"
          value={s.todayAttendance ? formatKPI(s.todayAttendance) : '0'}
          change="Checked-in"
          changeType="neutral"
          icon={Clock}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <ManagerStatCard
          title="Store Products"
          value={formatKPI(s.totalProducts)}
          change={s.lowStockCount > 0 ? `${s.lowStockCount} low stock` : 'All stocked'}
          changeType={s.lowStockCount > 0 ? 'down' : 'up'}
          icon={ShoppingCart}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <ManagerStatCard
          title={inqLabel}
          value={formatKPI(Math.round(s.newInquiries * multiplier))}
          change={`${s.totalInquiries} total`}
          changeType="up"
          icon={CheckCircle}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
      </div>

      {/* CRITICAL FIX: Missing Business KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <ManagerStatCard
          title="Today's Collection"
          value={formatCurrency(s.todayCollection || 0)}
          change="Daily revenue"
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <ManagerStatCard
          title="Revenue Growth"
          value={`${s.revenueGrowthPercent || 0}%`}
          change="MoM Change"
          changeType={(s.revenueGrowthPercent || 0) >= 0 ? "up" : "down"}
          icon={(s.revenueGrowthPercent || 0) >= 0 ? TrendingUp : TrendingDown}
          iconBg={(s.revenueGrowthPercent || 0) >= 0 ? "bg-success-bg" : "bg-danger-bg"}
          iconColor={(s.revenueGrowthPercent || 0) >= 0 ? "text-success" : "text-danger"}
        />
        <ManagerStatCard
          title="PT Revenue"
          value={formatCurrency(s.totalPTRevenue || 0)}
          change="This Month"
          changeType="neutral"
          icon={Target}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <ManagerStatCard
          title="Frozen Memberships"
          value={formatKPI(s.frozenMembershipsCount || 0)}
          change="Currently on hold"
          changeType="neutral"
          icon={Snowflake}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <ManagerStatCard
          title="Members Lost %"
          value={`${s.churnRate || 0}%`}
          change="This Month"
          changeType={(s.churnRate || 0) > 5 ? "down" : "neutral"}
          icon={AlertCircle}
          iconBg={(s.churnRate || 0) > 5 ? "bg-danger-bg" : "bg-warning-bg"}
          iconColor={(s.churnRate || 0) > 5 ? "text-danger" : "text-warning"}
        />
      </div>
    </>
  );
}
