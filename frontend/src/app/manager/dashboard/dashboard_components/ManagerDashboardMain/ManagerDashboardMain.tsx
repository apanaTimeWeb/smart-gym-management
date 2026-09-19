'use client';
// RESPONSIBILITY: Main entry point for the dashboard module. Renders the dashboard layout, owns the dashboard query lifecycle, and coordinates URL-backed reporting state.
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/ManagerUseManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import ManagerDashboardKPIs from '@/app/manager/dashboard/dashboard_components/ManagerDashboardKPIs/ManagerDashboardKPIs';
import ManagerDashboardRecentMembers from '@/app/manager/dashboard/dashboard_components/ManagerDashboardRecentMembers/ManagerDashboardRecentMembers';
import ManagerDashboardPendingPayments from '@/app/manager/dashboard/dashboard_components/ManagerDashboardPendingPayments/ManagerDashboardPendingPayments';
import ManagerDashboardExpiringMemberships from '@/app/manager/dashboard/dashboard_components/ManagerDashboardExpiringMemberships/ManagerDashboardExpiringMemberships';
import ManagerDashboardPromoCard from '@/app/manager/dashboard/dashboard_components/ManagerDashboardPromoCard/ManagerDashboardPromoCard';
import ManagerDashboardMembershipDistribution from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMembershipDistribution/ManagerDashboardMembershipDistribution';
import ManagerDashboardDateFilterDropdown from '@/app/manager/dashboard/dashboard_components/ManagerDashboardDateFilterDropdown/ManagerDashboardDateFilterDropdown';
import { getManagerErrorMessage } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import ManagerDashboardRevenueChart from '@/app/manager/dashboard/dashboard_components/ManagerDashboardRevenueChart/ManagerDashboardRevenueChart';
import ManagerDashboardMemberGrowthChart from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMemberGrowthChart/ManagerDashboardMemberGrowthChart';
import { ManagerDashboardSkeleton } from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMain/ManagerDashboardSkeleton/ManagerDashboardSkeleton';


export default function ManagerDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  const { range, startDate, endDate } = useManagerDashboardUrlState();
  const dashboardParams = { range, ...(range === 'custom' && startDate ? { startDate } : {}), ...(range === 'custom' && endDate ? { endDate } : {}) };
  const { data: stats, isLoading, isError, error, refetch } = useDashboardStatsQuery(dashboardParams);

  if (isLoading && !stats && !initialData) return <ManagerDashboardSkeleton />;

  if (isError) return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p role="alert" className="font-medium text-danger">{getManagerErrorMessage(error)}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 rounded-md bg-primary text-on-primary font-medium motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ManagerHeader title="Dashboard" subtitle="Welcome back, Manager! Here's your gym overview." />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-end mb-2 gap-3 items-center w-full">
          <ManagerDashboardDateFilterDropdown />
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
