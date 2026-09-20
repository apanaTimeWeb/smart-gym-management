// RESPONSIBILITY: Renders the page title, filter toolbar, and bulk action buttons for the Jobs page.
'use client';
// Pure view component — no data-fetching, no business logic. All handlers passed via props (Rule 34).
import { RefreshCw, Filter, Trash2 } from 'lucide-react';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { SuperadminJobsHeaderProps } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsHeaderTypes';

/**
 * Header section of the Background Jobs page.
 * Contains: page title, Clear Completed + Retry All buttons, and filter dropdowns.
 */
export default function SuperadminJobsHeader({ selectedCount, isRetrying, statusFilter, setStatusFilter, queueFilter, setQueueFilter, onClearCompleted, onRetryAll, onBulkRetry, onBulkDelete, onFilterChange, }: SuperadminJobsHeaderProps) {
    return (<div className="space-y-4">
      {/* Page Title + Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Background Jobs</h1>
          <p className="text-secondary mt-1 text-sm">Monitor async queues, inspect payloads, and manage tasks.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={onClearCompleted} className="bg-input text-primary px-4 py-2 rounded-lg font-medium hover:bg-border motion-safe:transition-colors border border-border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Clear Completed
          </button>
          <button onClick={onRetryAll} disabled={isRetrying} className="flex items-center gap-2 bg-danger-bg text-danger px-4 py-2 rounded-lg font-medium hover:bg-danger-bg motion-safe:transition-colors border border-border hover:border-transparent disabled:opacity-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger">
            <RefreshCw size={18} strokeWidth={2} className={isRetrying ? 'motion-safe:animate-spin' : ''}/>
            Retry All Failed
          </button>
        </div>
      </div>

      {/* Filter + Bulk Actions Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="w-4 text-secondary shrink-0"/>
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown value={statusFilter} onChange={(val) => { setStatusFilter(String(val)); onFilterChange(); }} options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'FAILED', label: 'Failed' },
            { value: 'ACTIVE', label: 'Active' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'DELAYED', label: 'Delayed' },
            { value: 'CANCELLED', label: 'Cancelled' },
        ]} className="bg-transparent border-transparent text-sm"/>
            </div>
          </div>
          <div className="w-40 border-none bg-input rounded-lg">
            <SearchableDropdown value={queueFilter} onChange={(val) => { setQueueFilter(String(val)); onFilterChange(); }} options={[
            { value: 'ALL', label: 'All Queues' },
            { value: 'billing', label: 'billing' },
            { value: 'email', label: 'email' },
            { value: 'webhook', label: 'webhook' },
            { value: 'database', label: 'database' },
        ]} className="bg-transparent border-transparent text-sm"/>
          </div>
        </div>

        {selectedCount > 0 && (<div className="flex items-center gap-3 motion-safe:animate-in motion-safe:slide-in-from-right-4">
            <span className="text-sm font-medium text-primary">{selectedCount} selected</span>
            <button onClick={onBulkRetry} className="flex items-center gap-1.5 bg-primary text-on-primary px-3 py-1.5 rounded-md text-sm hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <RefreshCw size={18} strokeWidth={2}/> Retry
            </button>
            <button onClick={onBulkDelete} className="flex items-center gap-1.5 bg-danger text-on-danger px-3 py-1.5 rounded-md text-sm hover:bg-danger-bg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger">
              <Trash2 size={18} strokeWidth={2}/> Delete
            </button>
          </div>)}
      </div>
    </div>);
}
