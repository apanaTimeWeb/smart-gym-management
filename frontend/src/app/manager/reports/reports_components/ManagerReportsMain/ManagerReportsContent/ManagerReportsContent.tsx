// RESPONSIBILITY: Renders the ManagerReportsContent sub-view extracted from ManagerReportsMain; owns only this presentation responsibility.
'use client';
// DATA FLOW:  → useManagerReportsLogic → KPIs + Charts + Table
import { Download, RefreshCw, Loader2 } from 'lucide-react';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import ManagerReportsCharts from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsCharts';
import ManagerReportsDateFilterDropdown from '@/app/manager/reports/reports_components/ManagerReportsDateFilterDropdown/ManagerReportsDateFilterDropdown';
import ManagerReportsKPIs from '@/app/manager/reports/reports_components/ManagerReportsKPIs/ManagerReportsKPIs';
import ManagerReportsTable from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsTable';
import { useManagerReportsLogic  } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
import { REPORT_TABS } from '@/app/manager/reports/reports_utils/ManagerReportsSharedConstants';


export function ManagerReportsContent() {
  const { tab, setTab, dateRange, setDateRange, isPending, isError, reload } = useManagerReportsLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Reports & Analytics" subtitle="Revenue, attendance, members lost, and expense breakdown" />

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex gap-1 bg-input rounded-xl p-1">
            {REPORT_TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium rounded-lg motion-safe:transition-colors ${
                  tab === t ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <div className="w-48">
              <ManagerReportsDateFilterDropdown />
            </div>
            <button
              onClick={reload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-secondary hover:text-primary motion-safe:transition-colors"
            >
              <RefreshCw size={18} /> Refresh
            </button>
            
          </div>
        </div>

        {/* KPIs */}
        {isPending ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <ManagerReportsKPIs />
        )}

        {/* Chart */}
        {isError ? (
          <div className="bg-card border border-border rounded-xl py-16 text-center space-y-3">
            <p className="text-sm text-danger font-medium">{MANAGER_GENERIC_ERROR_MESSAGE}</p>
            <button onClick={reload} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary hover:opacity-90 motion-safe:transition-colors">
              Try Again
            </button>
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
