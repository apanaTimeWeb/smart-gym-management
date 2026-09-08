// RESPONSIBILITY: Root client orchestrator for Staff Performance Dashboard.
'use client';

import { useAdminHrPerformanceLogic } from '@/app/admin/hr/hr_context/useAdminHrPerformanceLogic';
import AdminHrPerformancePeriodSelector from '@/app/admin/hr/hr_components/AdminHrPerformance/AdminHrPerformancePeriodSelector';
import AdminHrPerformanceKPIs from '@/app/admin/hr/hr_components/AdminHrPerformance/AdminHrPerformanceKPIs';
import AdminHrPerformanceTable from '@/app/admin/hr/hr_components/AdminHrPerformance/AdminHrPerformanceTable';
import AdminHrPerformanceCharts from '@/app/admin/hr/hr_components/AdminHrPerformance/AdminHrPerformanceCharts';
import { Target, Search } from 'lucide-react';

export default function AdminHrPerformanceMain() {
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
  } = useAdminHrPerformanceLogic();

  if (isError) {
    return (
      <div className="p-6 text-center text-danger">
        Failed to load performance data. Please try again.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Target className="text-primary" size={28} strokeWidth={2.5} />
            Staff Performance
          </h1>
          <p className="text-sm text-secondary mt-1">
            Evaluate trainers and managers across branches.
          </p>
        </div>

        <AdminHrPerformancePeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full motion-safe:animate-spin border-primary" />
        </div>
      ) : (
        <>
          {/* KPIs */}
          <AdminHrPerformanceKPIs aggregates={aggregates} />

          {/* Charts */}
          <AdminHrPerformanceCharts data={sortedData} />

          {/* Table Controls & Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-foreground w-full sm:w-auto">Detailed Metrics</h2>
              <div className="relative w-full sm:w-72">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary motion-safe:transition-all"
                />
              </div>
            </div>
            <AdminHrPerformanceTable
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
