"use client";
// RESPONSIBILITY: Root client orchestrator for Plan Revenue Dashboard.
import { useTranslations } from 'next-intl';
// THEME PORTABILITY CONTRACT: Depends on variables --bg-page, --bg-card, --bg-input, --border, --primary, --success, --info, --warning, --danger, --text-primary, --text-secondary, --disabled.

import { useAdminPlansRevenueLogic } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansRevenueLogic';
import AdminPlansRevenuePeriodSelector from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_revenue/AdminPlansRevenuePeriodSelector';
import AdminPlansRevenueKPIs from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_revenue/AdminPlansRevenueKPIs';
import AdminPlansRevenueCharts from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_revenue/AdminPlansRevenueCharts';
import AdminPlansRevenueTable from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_revenue/AdminPlansRevenueTable';
import { IndianRupee, Search } from 'lucide-react';
import AdminLayoutTableSkeleton from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton';

/**
 * AdminPlansRevenue renders the admin plans revenue main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPlansRevenue: Root client orchestrator for Plan Revenue Dashboard.
 * @dependencies Consumes useAdminPlansRevenueLogic, AdminPlansRevenuePeriodSelector, AdminPlansRevenueKPIs, AdminPlansRevenueCharts, AdminPlansRevenueTable.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPlansRevenue() {
  const t = useTranslations();

  const {
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDir,
    handleSort,
    sortedData,
    aggregates,
    isPending,
    isError, currentPage, totalPages, totalItems, setCurrentPage,
  } = useAdminPlansRevenueLogic();

  if (isError) {
    return (
      <div className="p-6 text-center text-danger">
        {t('plans.admin_plans_revenue.text_71436fe853')}</div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary tracking-tight flex items-center gap-2">
            <IndianRupee className="text-primary" size={18} strokeWidth={2} />
            {t('plans.admin_plans_revenue.text_fbb4303165')}</h1>
          <p className="text-sm text-secondary mt-1">
            {t('plans.admin_plans_revenue.text_47e0d7476a')}</p>
        </div>

        <AdminPlansRevenuePeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      {isPending ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {['revenue-1', 'revenue-2', 'revenue-3', 'revenue-4'].map((id) => <div key={id} className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />)}
          </div>
          <div className="h-72 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <AdminLayoutTableSkeleton rows={8} cols={6} />
        </>
      ) : (
        <>
          {/* KPIs */}
          <AdminPlansRevenueKPIs aggregates={aggregates} />

          {/* Charts */}
          <AdminPlansRevenueCharts data={sortedData} />

          {/* Table Controls & Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-primary w-full sm:w-auto">{t('plans.admin_plans_revenue.text_1210e4e75d')}</h2>
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-disabled"  strokeWidth={2}/></span>
                <input
                  type="text"
                  placeholder={t('plans.admin_plans_revenue.text_a04247f58d')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11"
                 data-testid="admin_plans-admin_plans-revenue-main-control"/>
              </div>
            </div>
            <AdminPlansRevenueTable
              data={sortedData}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}