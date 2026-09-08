// RESPONSIBILITY: Root client orchestrator for the Branch P&L Comparison page.
// Owns layout and composition. Delegates all logic to useAdminFinancePnlLogic. No direct API calls.
// DATA FLOW: page.tsx → AdminFinancePnlMain → useAdminFinancePnlLogic → child components
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { useAdminFinancePnlLogic } from '@/app/admin/finance/finance_context/useAdminFinancePnlLogic';
import AdminFinancePnlKPIs from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlKPIs';
import AdminFinancePnlPeriodSelector from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlPeriodSelector';
import AdminFinancePnlTable from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlTable';
import AdminFinancePnlCharts from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlCharts';
import { PNL_PERIOD_OPTIONS } from '@/app/admin/finance/finance_utils/AdminFinancePnlConstants';
import { Loader2 } from 'lucide-react';

export default function AdminFinancePnlMain() {
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
    isLoading,
    isError,
  } = useAdminFinancePnlLogic();

  const periodLabel = PNL_PERIOD_OPTIONS.find((o) => o.value === period)?.label ?? 'This Month';

  return (
    <div className="min-h-full pb-10 bg-background text-foreground">
      <AdminHeader
        title="Branch P&L Comparison"
        subtitle={`Profit & Loss analysis across all branches — ${periodLabel}`}
      />

      <div className="p-6 space-y-6">

        {/* Period Selector + Export */}
        <div className="flex items-center gap-3">
          <AdminFinancePnlPeriodSelector
            period={period}
            onPeriodChange={setPeriod}
          />
          {isLoading && <Loader2 size={18} className="animate-spin text-secondary" />}
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
              <h2 className="text-base font-semibold text-foreground">Branch-wise Breakdown</h2>
              <p className="text-xs text-secondary mt-0.5">
                Click any row to expand revenue &amp; expense details. Click column headers to sort.
              </p>
            </div>
            {statusFilter !== 'ALL' && (
              <button
                onClick={() => setStatusFilter('ALL')}
                className="text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Clear filter ×
              </button>
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
