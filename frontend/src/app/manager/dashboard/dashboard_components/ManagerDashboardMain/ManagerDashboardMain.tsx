'use client';
// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/ManagerUseManagerDashboardQueries';
import { useManagerDashboardStore } from '@/app/manager/dashboard/dashboard_store/ManagerUseManagerDashboardStore';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import ManagerDashboardKPIs from '@/app/manager/dashboard/dashboard_components/ManagerDashboardKPIs/ManagerDashboardKPIs';
import ManagerDashboardRecentMembers from '@/app/manager/dashboard/dashboard_components/ManagerDashboardRecentMembers/ManagerDashboardRecentMembers';
import ManagerDashboardPendingPayments from '@/app/manager/dashboard/dashboard_components/ManagerDashboardPendingPayments/ManagerDashboardPendingPayments';
import ManagerDashboardExpiringMemberships from '@/app/manager/dashboard/dashboard_components/ManagerDashboardExpiringMemberships/ManagerDashboardExpiringMemberships';
import ManagerDashboardPromoCard from '@/app/manager/dashboard/dashboard_components/ManagerDashboardPromoCard/ManagerDashboardPromoCard';
import ManagerDashboardMembershipDistribution from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMembershipDistribution/ManagerDashboardMembershipDistribution';
import { ManagerDateFilterDropdown } from '@/app/manager/manager_components/ManagerShared/ManagerDateFilterDropdown';
import ManagerDashboardRevenueChart from '@/app/manager/dashboard/dashboard_components/ManagerDashboardRevenueChart/ManagerDashboardRevenueChart';
import ManagerDashboardMemberGrowthChart from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMemberGrowthChart/ManagerDashboardMemberGrowthChart';

// Skeleton for the dashboard content area while client-side data loads
function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
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

export default function ManagerDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  const { timeRange } = useManagerDashboardStore();
  const { data: stats, isLoading, isError, error } = useDashboardStatsQuery(timeRange);

  if (isLoading && !stats && !initialData) return <DashboardSkeleton />;

  if (isError) return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p className="font-medium text-danger">Failed to load dashboard</p>
        <p className="text-sm mt-1 text-danger">{(error as Error)?.message}</p>
      </div>
    </div>
  );

  return (
    <>
      <ManagerHeader title="Dashboard" subtitle="Welcome back, Manager! Here's your gym overview." />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-end mb-2 gap-3 items-center w-full">
          <ManagerDateFilterDropdown />
        </div>
        <ManagerDashboardKPIs />
        
        {/* CRITICAL FIX: Missing Business Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ManagerDashboardRevenueChart />
          <ManagerDashboardMemberGrowthChart />
        </div>

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
