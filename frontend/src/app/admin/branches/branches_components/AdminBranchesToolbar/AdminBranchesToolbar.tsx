'use client';
// RESPONSIBILITY: Owns search, branch-status filtering, and analytics date-range controls for the Admin Branches list.
import { Calendar, Search, ShieldCheck } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/admin/branches/branches_context/useAdminBranchesLogic';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { BRANCH_STATUS_OPTIONS, BRANCH_TIME_RANGE_OPTIONS } from '@/app/admin/branches/branches_utils/AdminBranchesSharedConstants';

export default function AdminBranchesToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, timeRange, setTimeRange, startDate, setStartDate, endDate, setEndDate } = useAdminBranchesLogic();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
            <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">Branch Analytics</h2>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-secondary">
              <ShieldCheck size={12} className="text-success" aria-hidden="true" /> Read-only • Click any metric to see details
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          <div className="relative min-w-0 flex-1 sm:w-72">
            <label htmlFor="admin-branches-search" className="sr-only">Search branches</label>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center"><Search size={18} aria-hidden="true" className="text-secondary" /></span>
            <input id="admin-branches-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search branches..." className="min-h-11 w-full rounded-lg border border-border bg-input pl-9 pr-3 text-sm text-primary placeholder:text-secondary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </div>
          <div className="w-full sm:w-44">
            <label htmlFor="admin-branches-status" className="sr-only">Filter branch status</label>
            <AdminSearchableDropdown options={BRANCH_STATUS_OPTIONS as any} value={statusFilter} onChange={(value) => setStatusFilter(value as typeof statusFilter)} placeholder="All Statuses" />
          </div>
          <div className="w-full sm:w-44">
            <label htmlFor="admin-branches-range" className="sr-only">Select date range</label>
            <AdminSearchableDropdown options={BRANCH_TIME_RANGE_OPTIONS as any} value={timeRange} onChange={(value) => setTimeRange(value as typeof timeRange)} placeholder="Select range" />
          </div>
        </div>
      </div>

      {timeRange === 'custom' && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <label htmlFor="admin-branches-start-date" className="text-sm font-medium text-secondary">From:</label>
          <input id="admin-branches-start-date" type="date" className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          <label htmlFor="admin-branches-end-date" className="text-sm font-medium text-secondary">To:</label>
          <input id="admin-branches-end-date" type="date" className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} />
        </div>
      )}
    </div>
  );
}
