'use client';
// RESPONSIBILITY: Root client orchestrator for the Churn Alerts page.
// Owns filter state, action modal state, and data. Delegates rendering to child components.

import SuperadminChurnKPIs from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnKPIs/SuperadminChurnKPIs';
import SuperadminChurnFilters from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnFilters/SuperadminChurnFilters';
import SuperadminChurnTable from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnTable/SuperadminChurnTable';
import SuperadminChurnEmptyState from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnEmptyState/SuperadminChurnEmptyState';
import SuperadminChurnActionModal from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnActionModal/SuperadminChurnActionModal';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import type { ChurnFilterStatus } from '@/app/superadmin/churn-alerts/churn_types/churn_types';
import { useChurnAlertsPage } from '@/app/superadmin/churn-alerts/churn_utils/useChurnAlertsPage';

export default function SuperadminChurnMain() {
  const {
    search, setSearch,
    activeFilter, setActiveFilter,
    actionAlert, setActionAlert,
    currentPage, setCurrentPage,
    alertsLoading, kpisLoading,
    kpis, filtered, paginatedAlerts, totalPages, isFiltered,
    handleActionConfirm, handleBulkOutreach
  } = useChurnAlertsPage();

  if (alertsLoading || kpisLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-card rounded w-48 motion-safe:animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={`kpi-skel-${i}`} className="h-24 bg-card rounded-xl border border-border motion-safe:animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-card rounded-xl border border-border motion-safe:animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Churn Alerts</h1>
          <p className="text-secondary mt-1 text-sm">
            Monitor at-risk tenants and take proactive action before they churn.
          </p>
        </div>
        <button
          onClick={handleBulkOutreach}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium motion-safe:transition-colors shadow-lg shadow-primary/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Bulk Outreach
        </button>
      </div>

      <SuperadminChurnKPIs
        kpis={kpis}
        activeFilter={activeFilter}
        onFilterClick={(f) => { setActiveFilter(f as ChurnFilterStatus); setCurrentPage(1); }}
      />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <SuperadminChurnFilters
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        {filtered.length === 0 ? (
          <SuperadminChurnEmptyState
            isFiltered={isFiltered}
            onClearFilter={() => { setSearch(''); setActiveFilter('ALL'); }}
          />
        ) : (
          <>
            <SuperadminChurnTable
              alerts={paginatedAlerts}
              onActionClick={setActionAlert}
            />
            <SuperadminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {actionAlert && (
        <SuperadminChurnActionModal
          alert={actionAlert}
          onConfirm={handleActionConfirm}
          onClose={() => setActionAlert(null)}
        />
      )}
    </div>
  );
}
