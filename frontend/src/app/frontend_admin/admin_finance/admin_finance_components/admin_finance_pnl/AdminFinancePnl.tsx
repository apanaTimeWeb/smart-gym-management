"use client";
// RESPONSIBILITY: Root client orchestrator for the Branch P&L Comparison page.
import { useTranslations } from 'next-intl';
// Owns layout and composition. Delegates all logic to useAdminFinancePnlLogic. No direct API calls.
// DATA FLOW: page.tsx → AdminFinancePnl → useAdminFinancePnlLogic → child components
import { useAdminFinancePnlLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinancePnlLogic';
import AdminFinancePnlKPIs from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlKPIs';
import AdminFinancePnlPeriodSelector from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlPeriodSelector';
import AdminFinancePnlTable from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlTable';
import AdminFinancePnlCharts from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlCharts';
import { PNL_PERIOD_OPTIONS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { Loader2 } from 'lucide-react';

/**
 * AdminFinancePnl renders the admin finance pnl main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePnl: Root client orchestrator for the Branch P&L Comparison page.
 * @dependencies Consumes useAdminFinancePnlLogic, AdminFinancePnlKPIs, AdminFinancePnlPeriodSelector, AdminFinancePnlTable, AdminFinancePnlCharts.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePnl() {
  const t = useTranslations();

  const {
    period,
    setPeriod,
    statusFilter,
    setStatusFilter,
    sortKey,
    sortDir,
    handleSort,
    expandedBranchId,
    toggleExpand,
    sortedData,
    aggregates,
    isPending,
    isError,
  } = useAdminFinancePnlLogic();


  return (
    <div className="min-h-full pb-10 bg-page text-primary">

      <div className="p-6 space-y-6">

        {/* Period Selector + Export */}
        <div className="flex items-center gap-3">
          <AdminFinancePnlPeriodSelector
            period={period}
            onPeriodChange={setPeriod}
          />
          {isPending && <Loader2 size={18} className="motion-safe:animate-spin text-secondary motion-safe:duration-base"  strokeWidth={2}/>}
        </div>

        {/* KPI Cards */}
        <AdminFinancePnlKPIs
          aggregates={aggregates}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Charts */}
        <AdminFinancePnlCharts data={sortedData} />

        {/* P&L Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold text-primary">{t('finance.admin_finance_pnl.text_209d61d684')}</h2>
              <p className="text-xs text-secondary mt-0.5">
                {t('finance.admin_finance_pnl.text_5c89dc5750')}</p>
            </div>
            {statusFilter !== 'ALL' && (
              <button type="button"
                onClick={() => setStatusFilter('ALL')}
                className="motion-safe:transition-all motion-safe:duration-base ease-in-out text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
               data-testid="admin_finance-admin_finance-pnl-main-click">
                {t('finance.admin_finance_pnl.text_1d98da511f')}</button>
            )}
          </div>

          <AdminFinancePnlTable
            data={sortedData}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            expandedBranchId={expandedBranchId}
            onToggleExpand={toggleExpand}
            statusFilter={statusFilter}
            onResetFilter={() => setStatusFilter('ALL')}
          />
        </div>

      </div>
    </div>
  );
}