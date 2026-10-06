// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
"use client";
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_hooks/useAdminDashboardLogic';
import AdminDashboardKPIs from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_kpis/AdminDashboardKPIs';
import AdminDashboardBranchLeaderboard from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_branch_leaderboard/AdminDashboardBranchLeaderboard';
import AdminDashboardAlerts from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_alerts/AdminDashboardAlerts';
import AdminDashboardRevenueTrend from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_revenue_trend/AdminDashboardRevenueTrend';
import AdminDashboardExpiringWidget from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_expiring_widget/AdminDashboardExpiringWidget';
import AdminDashboardAttendanceTrend from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_attendance_trend/AdminDashboardAttendanceTrend';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';
import { AdminDashboardDateFilterDropdown } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_date_filter/AdminDashboardDateFilterDropdown';
import AdminDashboardSkeleton from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_main/AdminDashboardSkeleton';

/**
 * AdminDashboardMain renders the admin dashboard main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardMain: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
 * @dependencies Consumes useAdminDashboardLogic, AdminDashboardKPIs, AdminDashboardBranchLeaderboard, AdminDashboardAlerts, AdminDashboardRevenueTrend.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardMain() {
  const { stats, status, error } = useAdminDashboardLogic();

  if (status === 'pending') return <div className="min-h-full"><AdminDashboardSkeleton /></div>;

  if (status === 'error') {
    throw new Error(error || undefined);
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