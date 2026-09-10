// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles loading/error states, and sets up Context.
// DATA FLOW: page.tsx (SSR) → TrainerDashboardMain (Client) → DashboardProvider → child components
'use client';

import { DashboardProvider, useDashboardContext } from '@/app/trainer/dashboard/dashboard_context/DashboardContext';
import type { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';
import TrainerDashboardKPIs from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardKPIs/TrainerDashboardKPIs';
import TrainerDashboardUpcomingSessions from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardUpcomingSessions/TrainerDashboardUpcomingSessions';
import TrainerDashboardRecentProgress from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardRecentProgress/TrainerDashboardRecentProgress';
import TrainerDashboardQuickActions from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardQuickActions/TrainerDashboardQuickActions';
import TrainerDashboardGoalTrendChart from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardGoalTrendChart/TrainerDashboardGoalTrendChart';
import TrainerDashboardMembershipDistribution from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMembershipDistribution/TrainerDashboardMembershipDistribution';

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
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
    </div>
  );
}

function DashboardContent() {
  const { status, error } = useDashboardContext();

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
    <div className="p-6 space-y-6">
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

export default function TrainerDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  return (
    <DashboardProvider initialData={initialData}>
      <div className="min-h-full">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}
