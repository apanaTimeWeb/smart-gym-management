'use client';
// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles loading/error states.
// DATA FLOW: page.tsx (SSR) → TrainerDashboardMain (Client) → hooks → child components
import { usePermissions } from '@/lib/usePermissions';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import TrainerDashboardKPIs from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardKPIs/TrainerDashboardKPIs';
import TrainerDashboardUpcomingSessions from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardUpcomingSessions/TrainerDashboardUpcomingSessions';
import TrainerDashboardRecentProgress from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardRecentProgress/TrainerDashboardRecentProgress';
import TrainerDashboardQuickActions from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardQuickActions/TrainerDashboardQuickActions';
import TrainerDashboardGoalTrendChart from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardGoalTrendChart/TrainerDashboardGoalTrendChart';
import TrainerDashboardMembershipDistribution from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMembershipDistribution/TrainerDashboardMembershipDistribution';
import { TrainerDateFilterDropdown } from '@/app/trainer/trainer_components/TrainerShared/TrainerDateFilterDropdown';
import { AlertCircle } from 'lucide-react';

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        <div className="space-y-4">
          <div className="h-48 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
          <div className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        </div>
      </div>
    </div>
  );
}

export default function TrainerDashboardMain() {
  const { isLoading, isError, refetch } = useTrainerDashboardQuery();

  if (isLoading) {
    return (
      <div className="min-h-full">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-full flex items-center justify-center p-6">
        <div className="p-6 bg-danger/10 border border-danger rounded-xl flex items-center gap-3 text-danger max-w-md w-full">
          <AlertCircle size={24} />
          <div>
            <p className="font-bold">Unable to load dashboard data.</p>
            <button type="button" onClick={() => void refetch()} className="mt-3 min-w-24 px-3 py-2 rounded-lg bg-card border border-border text-sm font-semibold">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6 space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TrainerDateFilterDropdown />
      </div>
      <TrainerDashboardKPIs />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TrainerDashboardUpcomingSessions />
        <div className="space-y-6">
          <TrainerDashboardQuickActions />
          <TrainerDashboardRecentProgress />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TrainerDashboardGoalTrendChart />
        <TrainerDashboardMembershipDistribution />
      </div>
    </div>
  );
}
