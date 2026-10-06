// RESPONSIBILITY: Renders ManagerDashboardMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerDashboardDateFilterDropdown from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_date_filter_dropdown/ManagerDashboardDateFilterDropdown';
import ManagerDashboardExpiringMemberships from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_expiring_memberships/ManagerDashboardExpiringMemberships';
import ManagerDashboardKPIs from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_kpis/ManagerDashboardKPIs';
import { ManagerDashboardSkeleton } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_main/manager_dashboard_skeleton/ManagerDashboardSkeleton';
import ManagerDashboardMemberGrowthChart from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_member_growth_chart/ManagerDashboardMemberGrowthChart';
import ManagerDashboardMembershipDistribution from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_membership_distribution/ManagerDashboardMembershipDistribution';
import ManagerDashboardPendingPayments from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_pending_payments/ManagerDashboardPendingPayments';
import ManagerDashboardPromoCard from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_promo_card/ManagerDashboardPromoCard';
import ManagerDashboardRecentMembers from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_recent_members/ManagerDashboardRecentMembers';
import ManagerDashboardRevenueChart from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_revenue_chart/ManagerDashboardRevenueChart';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardUrlState';
import { getManagerErrorMessage } from '@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage';
import type { DashboardStats } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboardTypes';



/** @description Renders the ManagerDashboardMain component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (15 documented module/import dependencies).. @edge-case Preserves error state. */
/**
 * @description Orchestrates the Manager Dashboard route by assembling feature-local sections and passing their documented state/handlers. It does not own API calls or business calculations.
 * @dependencies Consumes the dashboard query/logic layer and approved zero-business shell primitives.
 * @edge-case Preserves dashboard loading, empty, error, retry, and responsive section composition.
 */
export default function ManagerDashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range, startDate, endDate } = useManagerDashboardUrlState();
  const dashboardParams = { range, ...(range === 'custom' && startDate ? { startDate } : {}), ...(range === 'custom' && endDate ? { endDate } : {}) };
  const { data: stats, isPending, isError, error, refetch } = useDashboardStatsQuery(dashboardParams);

  if (isPending && !stats && !initialData) return <ManagerDashboardSkeleton />;

  if (isError) return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p data-testid="manager_dashboard-manager-dashboard-main-status" role="alert" className="font-medium text-danger">{getManagerErrorMessage(error)}</p>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "mt-3 px-4 py-2 rounded-md bg-primary text-on-primary font-medium motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-main-button-refresh"
          type="button"
          onClick={() => refetch()}
          
        >{t("COPY_RETRY")}</button>
      </div>
    </div>
  );

  return (
    <>
      <ManagerHeader data-testid="manager_dashboard-managerdashboardmain-managerheader-1" title={t("COPY_DASHBOARD")} subtitle={t("COPY_WELCOME_BACK_MANAGER_HERE_S_GYM_OVERVIEW")} />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-end mb-2 gap-3 items-center w-full">
          <ManagerDashboardDateFilterDropdown  data-testid="manager_dashboard-managerdashboardmain-dashboard-date-filter-dropdown-1"/>
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
