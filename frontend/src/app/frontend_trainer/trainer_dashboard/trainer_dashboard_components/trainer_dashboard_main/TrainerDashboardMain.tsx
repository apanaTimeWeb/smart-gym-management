"use client";
// RESPONSIBILITY: Dashboard view composition only. Each child owns its own server-state query via the canonical dashboard query key.
import { useTranslations } from 'next-intl';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_hooks/useTrainerDashboardQuery';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/TrainerInfrastructureSkeletonBlock';

import TrainerDashboardDateFilterDropdown from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_date_filter_dropdown/TrainerDashboardDateFilterDropdown';

import TrainerDashboardGoalTrendChart from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_goal_trend_chart/TrainerDashboardGoalTrendChart';

import TrainerDashboardKPIs from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_kpis/TrainerDashboardKPIs';

import TrainerDashboardMembershipDistribution from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_membership_distribution/TrainerDashboardMembershipDistribution';

import TrainerDashboardQuickActions from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_quick_actions/TrainerDashboardQuickActions';

import TrainerDashboardRecentProgress from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_recent_progress/TrainerDashboardRecentProgress';

import TrainerDashboardUpcomingSessions from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_upcoming_sessions/TrainerDashboardUpcomingSessions';










/**
 * @description Dashboard view composition only. Each child owns its own server-state query via the canonical dashboard query key.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the dashboard feature UI responsibility represented by TrainerDashboardMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardMain() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const dashboardQuery = useTrainerDashboardQuery();

  if (dashboardQuery.isPending) {
    return <main className="min-h-full bg-page p-6" aria-busy="true" aria-label={t('TEXT_LOADING_DASHBOARD')}><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <TrainerInfrastructureSkeletonBlock key={`dashboard-kpi-skeleton-${index}`} className="h-28 rounded-xl border border-border" />)}</div><TrainerInfrastructureSkeletonBlock className="mt-5 h-72 rounded-xl border border-border" /></main>;
  }

  if (dashboardQuery.isError) {
    return <main className="min-h-full bg-page p-6"><div role="alert" className="max-w-xl rounded-xl border border-danger-bg bg-danger-bg p-5 text-danger"><p className="font-semibold">{t('TEXT_UNABLE_TO_LOAD_DASHBOARD')}</p><button type="button" onClick={() => void dashboardQuery.refetch()} className="mt-3 min-h-11 rounded-lg px-4 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('TEXT_RETRY')}</button></div></main>;
  }

  return (
    <main className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-page-title font-bold text-primary">{t("TEXT_DASHBOARD")}</h1>
            <p className="text-sm text-secondary mt-1">{t("TEXT_TRAINER_OPERATIONAL_OVERVIEW")}</p>
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
