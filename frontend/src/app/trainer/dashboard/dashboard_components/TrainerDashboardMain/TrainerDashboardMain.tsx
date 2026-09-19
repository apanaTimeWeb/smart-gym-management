'use client';
// RESPONSIBILITY: Dashboard view composition only. Each child owns its own server-state query via the canonical dashboard query key.
import TrainerDashboardKPIs from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardKPIs/TrainerDashboardKPIs';
import TrainerDashboardUpcomingSessions from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardUpcomingSessions/TrainerDashboardUpcomingSessions';
import TrainerDashboardRecentProgress from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardRecentProgress/TrainerDashboardRecentProgress';
import TrainerDashboardGoalTrendChart from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardGoalTrendChart/TrainerDashboardGoalTrendChart';
import TrainerDashboardMembershipDistribution from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMembershipDistribution/TrainerDashboardMembershipDistribution';
import TrainerDashboardQuickActions from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardQuickActions/TrainerDashboardQuickActions';
import TrainerDashboardDateFilterDropdown from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardDateFilterDropdown/TrainerDashboardDateFilterDropdown';

export default function TrainerDashboardMain() {
  return (
    <main className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <p className="text-sm text-secondary mt-1">Trainer operational overview</p>
          </div>
          <TrainerDashboardDateFilterDropdown />
        </div>
        <TrainerDashboardKPIs />
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-2"><TrainerDashboardGoalTrendChart /></div>
          <TrainerDashboardMembershipDistribution />
          <TrainerDashboardQuickActions />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <TrainerDashboardUpcomingSessions />
          <TrainerDashboardRecentProgress />
        </div>
      </div>
    </main>
  );
}
