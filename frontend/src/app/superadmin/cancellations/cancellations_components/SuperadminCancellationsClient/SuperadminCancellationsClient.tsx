// RESPONSIBILITY: Root client orchestrator for the Cancellations Alerts page.
'use client';
// Owns filter state, action modal state, and data. Delegates rendering to child components.
import SuperadminCancellationsKPIs from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsKPIs/SuperadminCancellationsKPIs';
import SuperadminCancellationsFilters from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsFilters/SuperadminCancellationsFilters';
import SuperadminCancellationsTable from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsTable/SuperadminCancellationsTable';
import SuperadminCancellationsEmptyState from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsEmptyState/SuperadminCancellationsEmptyState';
import SuperadminCancellationsActionModal from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsActionModal/SuperadminCancellationsActionModal';
import { Mail } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import type { CancellationsFilterStatus } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';
import { useSuperadminCancellationsAlertsPage } from '@/app/superadmin/cancellations/cancellations_utils/useSuperadminCancellationsAlertsPage';
export default function SuperadminCancellationsClient() {
    const { search, setSearch, activeFilter, setActiveFilter, actionAlert, setActionAlert, currentPage, setCurrentPage, isPending, isError: error, kpis, filtered, paginatedAlerts, totalPages, isFiltered, handleActionConfirm, handleBulkOutreach } = useSuperadminCancellationsAlertsPage();
    if (isPending) {
        return (<div className="space-y-6">
        <div className="h-8 bg-card rounded w-48 motion-safe:animate-pulse"/>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (<div key={`kpi-skel-${i}`} className="h-24 bg-card rounded-xl border border-border motion-safe:animate-pulse"/>))}
        </div>
        <div className="h-96 bg-card rounded-xl border border-border motion-safe:animate-pulse"/>
      </div>);
    }
    if (error) {
        return (<div className="p-8 text-center text-danger">Failed to load cancellations data.</div>);
    }
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Tenants at Risk of Cancellation</h1>
          <p className="text-secondary mt-1 text-sm">
            Monitor at-risk tenants and take proactive action before they cancel.
          </p>
        </div>
        <button type="button" onClick={handleBulkOutreach} className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary shadow-card shadow-primary/20 motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Mail size={18} aria-hidden="true" />
          Bulk Outreach
        </button>
      </div>

      <SuperadminCancellationsKPIs kpis={kpis} activeFilter={activeFilter} onFilterClick={(f) => { setActiveFilter(f as CancellationsFilterStatus); setCurrentPage(1); }}/>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <SuperadminCancellationsFilters search={search} onSearchChange={setSearch} activeFilter={activeFilter} onFilterChange={setActiveFilter}/>
        {filtered.length === 0 ? (<SuperadminCancellationsEmptyState isFiltered={isFiltered} onClearFilter={() => { setSearch(''); setActiveFilter('ALL'); }}/>) : (<>
            <SuperadminCancellationsTable alerts={paginatedAlerts} onActionClick={setActionAlert}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
          </>)}
      </div>

      {actionAlert && (<SuperadminCancellationsActionModal alert={actionAlert} onConfirm={handleActionConfirm} onClose={() => setActionAlert(null)}/>)}
    </div>);
}
