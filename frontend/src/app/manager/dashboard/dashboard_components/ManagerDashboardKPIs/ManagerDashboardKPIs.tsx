'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using server data from the dashboard TanStack Query contract.
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/ManagerUseManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { formatCurrencyFromMinorUnits, formatKPI } from '@/lib/formatters';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart, Snowflake, TrendingDown, Target } from 'lucide-react';

export default function ManagerDashboardKPIs() {
  const { range } = useManagerDashboardUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  
  if (!stats) return null;
  const s = stats;

  const timeLabel = range === 'weekly' ? 'This week' : range === 'yearly' ? 'This year' : range === 'custom' ? 'Selected range' : 'This month';
  const inqLabel = range === 'weekly' ? 'New Inquiries (Week)' : range === 'yearly' ? 'New Inquiries (Year)' : range === 'custom' ? 'New Inquiries (Custom)' : 'New Inquiries (Month)';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ManagerStatCard
          title="Today's Members"
          value={formatKPI(s.activeMembers)}
          change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% of total`}
          changeType="neutral"
          icon={Users}
          iconBg="bg-info"
          iconColor="text-info"
        />
        <ManagerStatCard
          title="Today's Collection"
          value={formatCurrencyFromMinorUnits(s.todayCollection, ManagerEnvConfig.currencyCode)}
          change="Daily revenue"
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success"
          iconColor="text-success"
        />
        <ManagerStatCard
          title="Trainer Attendance"
          value={s.trainerAttendance ? `${s.trainerAttendance.present}/${s.trainerAttendance.total}` : '0/0'}
          change="Present today"
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-warning"
          iconColor="text-warning"
        />
        <ManagerStatCard
          title="Pending Dues"
          value={formatCurrencyFromMinorUnits(s.pendingPayments, ManagerEnvConfig.currencyCode)}
          change={`${s.membersByStatus?.pending || 0} members`}
          changeType="down"
          icon={AlertCircle}
          iconBg="bg-danger"
          iconColor="text-danger"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <ManagerStatCard
          title="New Registrations"
          value={formatKPI(s.newMembersThisMonth)}
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
          iconBg="bg-warning"
          iconColor="text-warning"
        />
        <ManagerStatCard
          title="Store Products"
          value={formatKPI(s.totalProducts)}
          change={s.lowStockCount > 0 ? `${s.lowStockCount} low stock` : 'All stocked'}
          changeType={s.lowStockCount > 0 ? 'down' : 'up'}
          icon={ShoppingCart}
          iconBg="bg-info"
          iconColor="text-info"
        />
        <ManagerStatCard
          title={inqLabel}
          value={formatKPI(s.newInquiries)}
          change={`${s.totalInquiries} total`}
          changeType="up"
          icon={CheckCircle}
          iconBg="bg-success"
          iconColor="text-success"
        />
      </div>

      {/* CRITICAL FIX: Missing Business KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <ManagerStatCard
          title="Today's Collection"
          value={formatCurrencyFromMinorUnits(s.todayCollection || 0, ManagerEnvConfig.currencyCode)}
          change="Daily revenue"
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success"
          iconColor="text-success"
        />
        <ManagerStatCard
          title="Revenue Growth"
          value={`${s.revenueGrowthPercent || 0}%`}
          change="MoM Change"
          changeType={(s.revenueGrowthPercent || 0) >= 0 ? "up" : "down"}
          icon={(s.revenueGrowthPercent || 0) >= 0 ? TrendingUp : TrendingDown}
          iconBg={(s.revenueGrowthPercent || 0) >= 0 ? "bg-success" : "bg-danger"}
          iconColor={(s.revenueGrowthPercent || 0) >= 0 ? "text-success" : "text-danger"}
        />
        <ManagerStatCard
          title="PT Revenue"
          value={formatCurrencyFromMinorUnits(s.totalPTRevenue || 0, ManagerEnvConfig.currencyCode)}
          change="This Month"
          changeType="neutral"
          icon={Target}
          iconBg="bg-info"
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
          iconBg={(s.churnRate || 0) > 5 ? "bg-danger" : "bg-warning"}
          iconColor={(s.churnRate || 0) > 5 ? "text-danger" : "text-warning"}
        />
      </div>
    </>
  );
}
