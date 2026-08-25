// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
'use client';

import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import { DashboardProvider, useDashboardContext } from '@/app/trainer/dashboard/dashboard_context/DashboardContext';
import { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';
import DashboardKPIs from '@/app/trainer/dashboard/dashboard_components/DashboardKPIs/DashboardKPIs';
import RecentMembers from '@/app/trainer/dashboard/dashboard_components/RecentMembers/RecentMembers';
import PromoCard from '@/app/trainer/dashboard/dashboard_components/PromoCard/PromoCard';
import MembershipDistribution from '@/app/trainer/dashboard/dashboard_components/MembershipDistribution/MembershipDistribution';

// Skeleton for the dashboard content area while client-side data loads
function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-card rounded-xl animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-card rounded-xl animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl animate-pulse border border-border" />
        <div className="space-y-4">
          <div className="h-48 bg-card rounded-xl animate-pulse border border-border" />
          <div className="h-28 bg-card rounded-xl animate-pulse border border-border" />
        </div>
      </div>
      <div className="h-40 bg-card rounded-xl animate-pulse border border-border" />
    </div>
  );
}

function DashboardContent() {
  const { status, error, timeRange, setTimeRange } = useDashboardContext();

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
      <TrainerHeader title="Dashboard" subtitle="Welcome back, Trainer! Here's your gym overview." />
      <div className="p-6 space-y-6">
        <div className="flex justify-end mb-2">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <DashboardKPIs />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <RecentMembers />
          <div className="space-y-4">
            <PromoCard />
          </div>
        </div>
        <MembershipDistribution />
      </div>
    </>
  );
}

export default function DashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  return (
    <DashboardProvider initialData={initialData}>
      <div className="min-h-full">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}
