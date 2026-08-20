// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from DashboardContext.
'use client';

import { useDashboardContext } from '@/app/admin/dashboard/dashboard_context/DashboardContext';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { formatCurrency } from '@/app/admin/dashboard/dashboard_utils/DashboardSharedConstants';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart } from 'lucide-react';

export default function DashboardKPIs() {
  const { stats } = useDashboardContext();
  if (!stats) return null;
  const s = stats;

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
          title="Monthly Revenue"
          value={formatCurrency(s.monthlyRevenue)}
          change="This month"
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
          title="New Members (Month)"
          value={s.newMembersThisMonth.toLocaleString()}
          change="This month"
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
          title="New Inquiries"
          value={s.newInquiries.toLocaleString()}
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
