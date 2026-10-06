// RESPONSIBILITY: Renders ManagerReportsContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerReportsCharts from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_charts/ManagerReportsCharts';
import ManagerReportsDateFilterDropdown from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_date_filter_dropdown/ManagerReportsDateFilterDropdown';
import ManagerReportsKPIs from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_kpis/ManagerReportsKPIs';
import ManagerReportsTable from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/ManagerReportsTable';
import { REPORT_TABS } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsSharedConstants';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';


/** @description Renders the ManagerReportsContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves error state. */
export function ManagerReportsContent() {
  const t = useTranslations('MANAGER_REPORTS');

  const { tab, setTab, isPending, isError, reload } = useManagerReportsLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_reports-managerreportscontent-managerheader-1" title={t("COPY_REPORTS_ANALYTICS")} subtitle={t("COPY_REVENUE_ATTENDANCE_MEMBERS_LOST_EXPENSE_BREAKDOWN")} />

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex gap-1 bg-input rounded-xl p-1">
            {REPORT_TABS.map((t, mapIndex) => (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-4 py-2 text-sm font-medium rounded-lg motion-safe:transition-all ${
                  tab === t ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
                } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_reports-reports-managerreportscontent-button-primary-${mapIndex}`}
                key={t}
                onClick={() => setTab(t)}
                
              >
                {t}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <div className="w-48">
              <ManagerReportsDateFilterDropdown  data-testid="manager_reports-managerreportscontent-reports-date-filter-dropdown-1"/>
            </div>
            <button data-testid="manager_reports-manager-reports-content-reload-1"
              onClick={reload}
              className="min-w-32 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
            >
              <RefreshCw size={18} strokeWidth={2}/>{t("COPY_REFRESH")}</button>
          </div>
        </div>

        {/* KPIs */}
        {isPending ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" />
            ))}
          </div>
        ) : (
          <ManagerReportsKPIs />
        )}

        {/* Chart */}
        {isError ? (
          <div className="bg-card border border-border rounded-xl py-16 text-center space-y-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-sm text-danger font-medium">{t("TEXT_GENERIC_ERROR")}</p>
            <button data-testid="manager_reports-manager-reports-content-reload-2" onClick={reload} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">{t("COPY_TRY_AGAIN_1")}</button>
          </div>
        ) : (
          <ManagerReportsCharts />
        )}

        {/* Data Table */}
        <ManagerReportsTable />
      </div>
    </div>
  );
}
