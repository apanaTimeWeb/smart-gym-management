// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
'use client';

import { useDashboardContext } from '@/app/manager/dashboard/dashboard_context/DashboardContext';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { formatCurrency } from '@/app/manager/dashboard/dashboard_utils/DashboardSharedConstants';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart } from 'lucide-react';

export default function DashboardKPIs() {
  const { stats, timeRange } = useDashboardContext();
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
          title="Total Members"
          value={s.totalMembers.toLocaleString()}
          change="All time"
          changeType="up"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <ManagerStatCard
          title={revLabel}
          value={formatCurrency(s.monthlyRevenue * multiplier)}
          change={timeLabel}
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <ManagerStatCard
          title="Active Members"
          value={s.activeMembers.toLocaleString()}
          change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% of total`}
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <ManagerStatCard
          title="Pending Payments"
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
          title={memLabel}
          value={Math.round(s.newMembersThisMonth * multiplier).toLocaleString()}
          change={timeLabel}
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <ManagerStatCard
          title="Total Staff"
          value={s.activeStaff.toLocaleString()}
          change="Active staff"
          changeType="neutral"
          icon={Clock}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <ManagerStatCard
          title="Store Products"
          value={s.totalProducts.toLocaleString()}
          change={s.lowStockCount > 0 ? `${s.lowStockCount} low stock` : 'All stocked'}
          changeType={s.lowStockCount > 0 ? 'down' : 'up'}
          icon={ShoppingCart}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <ManagerStatCard
          title={inqLabel}
          value={Math.round(s.newInquiries * multiplier).toLocaleString()}
          change={`${s.totalInquiries} total`}
          changeType="up"
          icon={CheckCircle}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
      </div>
    </>
  );
}
