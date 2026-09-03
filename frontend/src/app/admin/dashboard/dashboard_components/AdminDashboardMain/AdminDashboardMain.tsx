// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { DashboardProvider, useDashboardContext } from '@/app/admin/dashboard/dashboard_context/DashboardContext';
import type { DashboardStats, TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import AdminDashboardKPIs from '@/app/admin/dashboard/dashboard_components/AdminDashboardKPIs/AdminDashboardKPIs';
import AdminDashboardRecentMembers from '@/app/admin/dashboard/dashboard_components/AdminDashboardRecentMembers/AdminDashboardRecentMembers';
import AdminDashboardPendingPayments from '@/app/admin/dashboard/dashboard_components/AdminDashboardPendingPayments/AdminDashboardPendingPayments';
import AdminDashboardPromoCard from '@/app/admin/dashboard/dashboard_components/AdminDashboardPromoCard/AdminDashboardPromoCard';
import AdminDashboardMembershipDistribution from '@/app/admin/dashboard/dashboard_components/AdminDashboardMembershipDistribution/AdminDashboardMembershipDistribution';

// Skeleton for the dashboard content area while client-side data loads
function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        <div className="space-y-4">
          <div className="h-48 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
          <div className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        </div>
      </div>
      <div className="h-40 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}

function DashboardContent() {
  const { status, error, timeRange, setTimeRange, startDate, endDate, setCustomDateRange } = useDashboardContext();

  if (status === 'loading') return <DashboardSkeleton />;

  if (status === 'error') return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p className="font-medium text-danger">Failed to load dashboard</p>
        <p className="text-sm mt-1 text-danger">{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Welcome back, Admin! Here's your gym overview." />
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
          <AdminDashboardRecentMembers />
          <div className="space-y-4">
            <AdminDashboardPendingPayments />
            <AdminDashboardPromoCard />
          </div>
        </div>
        <AdminDashboardMembershipDistribution />
      </div>
    </>
  );
}

export default function AdminDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  return (
    <DashboardProvider initialData={initialData}>
      <div className="min-h-full">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}
