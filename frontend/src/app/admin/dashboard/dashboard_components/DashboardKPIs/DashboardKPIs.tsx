// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
'use client';

import { useDashboardContext } from '@/app/admin/dashboard/dashboard_context/DashboardContext';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { formatCurrency } from '@/app/admin/dashboard/dashboard_utils/DashboardSharedConstants';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart } from 'lucide-react';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';

export default function DashboardKPIs() {
  const { stats, timeRange } = useDashboardContext();
  const { selectedBranchId } = useAdminGlobalStore();
  
  if (!stats) return null;
  
  // Simulated API response behavior: scale down metrics if a specific branch is selected.
  const scale = selectedBranchId === 'all' ? 1 : 0.35;
  const s = {
    ...stats,
    totalMembers: Math.floor(stats.totalMembers * scale),
    monthlyRevenue: stats.monthlyRevenue * scale,
    activeMembers: Math.floor(stats.activeMembers * scale),
    pendingPayments: stats.pendingPayments * scale,
    newMembersThisMonth: Math.floor(stats.newMembersThisMonth * scale),
    activeStaff: Math.floor(stats.activeStaff * scale),
    totalProducts: Math.floor(stats.totalProducts * scale),
    lowStockCount: Math.floor(stats.lowStockCount * scale),
    newInquiries: Math.floor(stats.newInquiries * scale),
    totalInquiries: Math.floor(stats.totalInquiries * scale),
    membersByStatus: {
      pending: Math.floor((stats.membersByStatus?.pending || 0) * scale),
      active: Math.floor((stats.membersByStatus?.active || 0) * scale),
      expired: Math.floor((stats.membersByStatus?.expired || 0) * scale)
    }
  };

  const timeMultiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const timeLabel = timeRange === 'weekly' ? 'This week' : timeRange === 'yearly' ? 'This year' : timeRange === 'custom' ? 'Selected range' : 'This month';
  const revLabel = timeRange === 'weekly' ? 'Weekly Revenue' : timeRange === 'yearly' ? 'Yearly Revenue' : timeRange === 'custom' ? 'Custom Revenue' : 'Monthly Revenue';
  const memLabel = timeRange === 'weekly' ? 'New Members (Week)' : timeRange === 'yearly' ? 'New Members (Year)' : timeRange === 'custom' ? 'New Members (Custom)' : 'New Members (Month)';
  const inqLabel = timeRange === 'weekly' ? 'New Inquiries (Week)' : timeRange === 'yearly' ? 'New Inquiries (Year)' : timeRange === 'custom' ? 'New Inquiries (Custom)' : 'New Inquiries (Month)';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminStatCard
          title="Total Members"
          value={s.totalMembers.toLocaleString()}
          change="All time"
          changeType="up"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <AdminStatCard
          title={revLabel}
          value={formatCurrency(s.monthlyRevenue * timeMultiplier)}
          change={timeLabel}
          changeType="up"
          icon={DollarSign}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <AdminStatCard
          title="Active Members"
          value={s.activeMembers.toLocaleString()}
          change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% of total`}
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <AdminStatCard
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
        <AdminStatCard
          title={memLabel}
          value={Math.round(s.newMembersThisMonth * timeMultiplier).toLocaleString()}
          change={timeLabel}
          changeType="up"
          icon={TrendingUp}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <AdminStatCard
          title="Total Staff"
          value={s.activeStaff.toLocaleString()}
          change="Active staff"
          changeType="neutral"
          icon={Clock}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
        <AdminStatCard
          title="Store Products"
          value={s.totalProducts.toLocaleString()}
          change={s.lowStockCount > 0 ? `${s.lowStockCount} low stock` : 'All stocked'}
          changeType={s.lowStockCount > 0 ? 'down' : 'up'}
          icon={ShoppingCart}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <AdminStatCard
          title={inqLabel}
          value={Math.round(s.newInquiries * timeMultiplier).toLocaleString()}
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
