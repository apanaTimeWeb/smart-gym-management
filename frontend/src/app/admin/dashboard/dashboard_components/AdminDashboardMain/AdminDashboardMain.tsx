"use client";
// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';
import AdminDashboardKPIs from '@/app/admin/dashboard/dashboard_components/AdminDashboardKPIs/AdminDashboardKPIs';
import AdminDashboardBranchLeaderboard from '@/app/admin/dashboard/dashboard_components/AdminDashboardBranchLeaderboard/AdminDashboardBranchLeaderboard';
import AdminDashboardAlerts from '@/app/admin/dashboard/dashboard_components/AdminDashboardAlerts/AdminDashboardAlerts';
import AdminDashboardRevenueTrend from '@/app/admin/dashboard/dashboard_components/AdminDashboardRevenueTrend/AdminDashboardRevenueTrend';
import AdminDashboardExpiringWidget from '@/app/admin/dashboard/dashboard_components/AdminDashboardExpiringWidget/AdminDashboardExpiringWidget';
import AdminDashboardAttendanceTrend from '@/app/admin/dashboard/dashboard_components/AdminDashboardAttendanceTrend/AdminDashboardAttendanceTrend';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { AdminDashboardDateFilterDropdown } from '@/app/admin/dashboard/dashboard_components/AdminDashboardDateFilter/AdminDashboardDateFilterDropdown';
import AdminDashboardSkeleton from '@/app/admin/dashboard/dashboard_components/AdminDashboardMain/AdminDashboardSkeleton';

export default function AdminDashboardMain() {
  const { stats, status, error } = useAdminDashboardLogic();

  if (status === 'pending') return <div className="min-h-full"><AdminDashboardSkeleton /></div>;

  if (status === 'error') {
    throw new Error(error || 'Failed to load dashboard');
  }

  return (
    <div className="min-h-full">
      <div className="p-6 space-y-6">

        {/* Time Range Selector */}
        <div className="flex justify-end items-center">
          <AdminDashboardDateFilterDropdown />
        </div>

        {/* KPIs */}
        <AdminDashboardKPIs />

        {/* Row 2: Leaderboard + Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AdminDashboardBranchLeaderboard />
          </div>
          <div className="max-h-96">
            <AdminDashboardAlerts />
          </div>
        </div>

        {/* Row 3: Revenue Trend */}
        <AdminDashboardRevenueTrend />

        {/* Row 4: Attendance Trend + Expiring Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AdminDashboardAttendanceTrend />
          </div>
          <div>
            <AdminDashboardExpiringWidget />
          </div>
        </div>

      </div>
    </div>
  );
}