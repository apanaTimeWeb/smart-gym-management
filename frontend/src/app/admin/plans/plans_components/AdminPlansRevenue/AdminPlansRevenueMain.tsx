// RESPONSIBILITY: Root client orchestrator for Plan Revenue Dashboard.
// THEME PORTABILITY CONTRACT: Depends on variables --bg-page, --bg-card, --bg-input, --border, --primary, --success, --info, --warning, --danger, --text-primary, --text-secondary, --disabled.
'use client';

import { useAdminPlansRevenueLogic } from '@/app/admin/plans/plans_context/useAdminPlansRevenueLogic';
import AdminPlansRevenuePeriodSelector from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenuePeriodSelector';
import AdminPlansRevenueKPIs from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueKPIs';
import AdminPlansRevenueCharts from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueCharts';
import AdminPlansRevenueTable from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueTable';
import { IndianRupee, Search } from 'lucide-react';

export default function AdminPlansRevenueMain() {
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
    isLoading,
    isError,
  } = useAdminPlansRevenueLogic();

  if (isError) {
    return (
      <div className="p-6 text-center text-danger">
        Failed to load revenue data. Please try again.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <IndianRupee className="text-primary" size={28} strokeWidth={2.5} />
            Membership Plan Revenue
          </h1>
          <p className="text-sm text-secondary mt-1">
            Track revenue attribution and performance metrics across subscription plans.
          </p>
        </div>

        <AdminPlansRevenuePeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full motion-safe:animate-spin border-primary" />
        </div>
      ) : (
        <>
          {/* KPIs */}
          <AdminPlansRevenueKPIs aggregates={aggregates} />

          {/* Charts */}
          <AdminPlansRevenueCharts data={sortedData} />

          {/* Table Controls & Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-foreground w-full sm:w-auto">Plan Breakdown</h2>
              <div className="relative w-full sm:w-72">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled" />
                <input
                  type="text"
                  placeholder="Search plan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary motion-safe:transition-all"
                />
              </div>
            </div>
            <AdminPlansRevenueTable
              data={sortedData}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </div>
        </>
      )}
    </div>
  );
}
