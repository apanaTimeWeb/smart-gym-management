// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { DashboardProvider, useDashboardContext } from '@/app/manager/dashboard/dashboard_context/ManagerDashboardContext';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import ManagerDashboardKPIs from '@/app/manager/dashboard/dashboard_components/ManagerDashboardKPIs/ManagerDashboardKPIs';
import ManagerDashboardRecentMembers from '@/app/manager/dashboard/dashboard_components/ManagerDashboardRecentMembers/ManagerDashboardRecentMembers';
import ManagerDashboardPendingPayments from '@/app/manager/dashboard/dashboard_components/ManagerDashboardPendingPayments/ManagerDashboardPendingPayments';
import ManagerDashboardExpiringMemberships from '@/app/manager/dashboard/dashboard_components/ManagerDashboardExpiringMemberships/ManagerDashboardExpiringMemberships';
import ManagerDashboardPromoCard from '@/app/manager/dashboard/dashboard_components/ManagerDashboardPromoCard/ManagerDashboardPromoCard';
import ManagerDashboardMembershipDistribution from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMembershipDistribution/ManagerDashboardMembershipDistribution';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/SearchableDropdown';

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
      <ManagerHeader title="Dashboard" subtitle="Welcome back, Manager! Here's your gym overview." />
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
          <div className="w-full sm:w-48">
            <SearchableDropdown 
              value={timeRange} 
              onChange={(value) => {
                const valStr = value as "weekly" | "monthly" | "yearly" | "custom";
                if (valStr !== 'custom') {
                  setTimeRange(valStr as "weekly" | "monthly" | "yearly");
                  setCustomDateRange('', '');
                } else {
                  // The context type for timeRange is probably "weekly" | "monthly" | "yearly", but custom is used.
                  // Wait, looking at the previous select, timeRange state holds "custom".
                  // So we cast it.
                  setTimeRange(valStr as any);
                }
              }}
              options={[
                { value: 'weekly', label: 'This Week' },
                { value: 'monthly', label: 'This Month' },
                { value: 'yearly', label: 'This Year' },
                { value: 'custom', label: 'Custom Range' },
              ]}
              className="bg-input"
            />
          </div>
        </div>
        <ManagerDashboardKPIs />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <ManagerDashboardRecentMembers />
          <div className="space-y-4">
            <ManagerDashboardPendingPayments />
            <ManagerDashboardExpiringMemberships />
            <ManagerDashboardPromoCard />
          </div>
        </div>
        <ManagerDashboardMembershipDistribution />
      </div>
    </>
  );
}

export default function ManagerDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  return (
    <DashboardProvider initialData={initialData}>
      <div className="min-h-full">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}
