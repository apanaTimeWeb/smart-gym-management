"use client";
// RESPONSIBILITY: SuperadminJobsView.tsx — orchestrator for the Background Jobs page.
// Composes all isolated sub-components and passes data from useJobsPage hook.
// No business logic or rendering of UI primitives here (Rule 6, Rule 34).
//
// DATA FLOW: useJobsPage → SuperadminJobsView → SuperadminJobsHeader + StatsBar + Table + InspectModal

import { Loader2 } from 'lucide-react';
import { useJobsPage } from '@/app/superadmin/jobs/jobs_components/jobs_utils/useJobsPage';
import SuperadminJobsHeader from '@/app/superadmin/jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader';
import SuperadminJobsStatsBar from '@/app/superadmin/jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar';
import SuperadminJobsTable from '@/app/superadmin/jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable';
import SuperadminJobInspectModal from '@/app/superadmin/jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

export default function SuperadminJobsView() {
  const {
    fetchState,
    filteredJobs,
    paginatedJobs,
    currentPage,
    totalPages,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
    queueFilter,
    setQueueFilter,
    selectedJobIds,
    toggleSelection,
    toggleAll,
    inspectJob,
    setInspectJob,
    isRetrying,
    handleRetryAll,
    handleRetryJob,
    handleCancelJob,
    handleDeleteJob,
    handleClearCompleted,
    handleBulkRetry,
    handleBulkDelete,
    metrics,
  } = useJobsPage();

  if (fetchState === 'loading') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-8 w-64 bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={`sk-stat-${i}`} className="h-24 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
          ))}
        </div>
        <div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
      </div>
    );
  }

  if (fetchState === 'error') {
    return <div className="p-8 text-center text-danger font-medium">Error loading jobs. Please try again.</div>;
  }

  return (
    <div className="space-y-6">
      <SuperadminJobsHeader
        selectedCount={selectedJobIds.size}
        isRetrying={isRetrying}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        queueFilter={queueFilter}
        setQueueFilter={setQueueFilter}
        onClearCompleted={handleClearCompleted}
        onRetryAll={handleRetryAll}
        onBulkRetry={handleBulkRetry}
        onBulkDelete={handleBulkDelete}
        onFilterChange={() => setCurrentPage(1)}
      />

      <SuperadminJobsStatsBar metrics={metrics} />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-96">
        <SuperadminJobsTable
          jobs={paginatedJobs}
          allJobsFiltered={statusFilter !== 'ALL' || queueFilter !== 'ALL'}
          selectedJobIds={selectedJobIds}
          toggleSelection={toggleSelection}
          toggleAll={toggleAll}
          onInspect={setInspectJob}
          onRetry={handleRetryJob}
          onCancel={handleCancelJob}
          onDelete={handleDeleteJob}
        />
        <SuperadminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {inspectJob && (
        <SuperadminJobInspectModal
          job={inspectJob}
          onClose={() => setInspectJob(null)}
        />
      )}
    </div>
  );
}
