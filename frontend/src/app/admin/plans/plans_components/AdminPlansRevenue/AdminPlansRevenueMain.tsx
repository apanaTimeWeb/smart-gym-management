"use client";
// RESPONSIBILITY: Root client orchestrator for Plan Revenue Dashboard.
// THEME PORTABILITY CONTRACT: Depends on variables --bg-page, --bg-card, --bg-input, --border, --primary, --success, --info, --warning, --danger, --text-primary, --text-secondary, --disabled.

import { useAdminPlansRevenueLogic } from '@/app/admin/plans/plans_context/useAdminPlansRevenueLogic';
import AdminPlansRevenuePeriodSelector from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenuePeriodSelector';
import AdminPlansRevenueKPIs from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueKPIs';
import AdminPlansRevenueCharts from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueCharts';
import AdminPlansRevenueTable from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueTable';
import { IndianRupee, Search } from 'lucide-react';
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';

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
    isPending,
    isError, currentPage, totalPages, totalItems, setCurrentPage,
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
          <h1 className="text-2xl font-black text-primary tracking-tight flex items-center gap-2">
            <IndianRupee className="text-primary" size={28} strokeWidth={2.5} />
            Membership Plan Revenue
          </h1>
          <p className="text-sm text-secondary mt-1">
            Track revenue attribution and performance metrics across subscription plans.
          </p>
        </div>

        <AdminPlansRevenuePeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      {isPending ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {['revenue-1', 'revenue-2', 'revenue-3', 'revenue-4'].map((id) => <div key={id} className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />)}
          </div>
          <div className="h-72 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <AdminTableSkeleton rows={8} cols={6} />
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
              <h2 className="text-lg font-bold text-primary w-full sm:w-auto">Plan Breakdown</h2>
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-disabled" /></span>
                <input
                  type="text"
                  placeholder="Search plan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base"
                />
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