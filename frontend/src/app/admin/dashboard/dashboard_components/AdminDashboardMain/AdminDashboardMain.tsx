// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';

import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';
import { useAdminDashboardStore } from '@/app/admin/dashboard/dashboard_store/useAdminDashboardStore';
import type { DashboardStats, TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import AdminDashboardKPIs from '@/app/admin/dashboard/dashboard_components/AdminDashboardKPIs/AdminDashboardKPIs';
import AdminDashboardBranchLeaderboard from '@/app/admin/dashboard/dashboard_components/AdminDashboardBranchLeaderboard/AdminDashboardBranchLeaderboard';
import AdminDashboardAlerts from '@/app/admin/dashboard/dashboard_components/AdminDashboardAlerts/AdminDashboardAlerts';
import AdminDashboardRevenueTrend from '@/app/admin/dashboard/dashboard_components/AdminDashboardRevenueTrend/AdminDashboardRevenueTrend';

// Skeleton for the dashboard content area while client-side data loads
function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
      </div>
      <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}

export default function AdminDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  // To avoid prop drilling, we could pass initialData to a hook here, but since the child DashboardContent
  // uses the hook, it's better to inline DashboardContent or pass initialData down.
  // We'll merge DashboardContent into AdminDashboardMain.
  const { stats, status, error } = useAdminDashboardLogic(initialData);
  const { timeRange, setTimeRange, startDate, endDate, setCustomDateRange } = useAdminDashboardStore();

  if (status === 'loading') return (
    <div className="min-h-full">
      <DashboardSkeleton />
    </div>
  );

  if (status === 'error') return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p className="font-medium text-danger">Failed to load dashboard</p>
        <p className="text-sm mt-1 text-danger">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-full">
      <AdminHeader title="Dashboard" subtitle="Welcome back, Admin! Here's your business overview." />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-end mb-2 gap-3 items-center w-full">
          {timeRange === 'custom' && (
            <div className="flex flex-wrap items-center gap-2 sm:mr-2 justify-center sm:justify-start w-full sm:w-auto">
              <label className="text-sm font-medium text-secondary">From:</label>
              <input
                type="date"
                className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                value={startDate}
                onChange={(e) => setCustomDateRange(e.target.value, endDate)}
                aria-label="Start Date"
              />
              <label className="text-sm font-medium text-secondary ml-1">To:</label>
              <input
                type="date"
                className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                value={endDate}
                onChange={(e) => setCustomDateRange(startDate, e.target.value)}
                aria-label="End Date"
              />
            </div>
          )}
          <select 
            value={timeRange} 
            onChange={(e) => {
              setTimeRange(e.target.value as TimeRange);
              if (e.target.value !== 'custom') {
                setCustomDateRange('', '');
              }
            }}
            className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary w-full sm:w-auto"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <AdminDashboardKPIs />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-full">
            <AdminDashboardBranchLeaderboard />
          </div>
          <div className="h-full max-h-96">
            <AdminDashboardAlerts />
          </div>
        </div>
        
        <AdminDashboardRevenueTrend />
      </div>
    </div>
  );
}

