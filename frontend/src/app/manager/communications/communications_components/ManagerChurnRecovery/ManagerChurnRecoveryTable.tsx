'use client';
// RESPONSIBILITY: Paginated, searchable, filterable table of churned/exited members in the Churn Recovery tab.
import { MANAGER_CHURN_RECOVERY_TABLE_HEADERS } from '@/app/manager/communications/communications_constants/ManagerCommunicationsTableConstants';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import type { ManagerChurnRecoveryTableProps } from '@/app/manager/communications/communications_types/ManagerChurnRecoveryTableTypes';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ManagerChurnRecoveryTableRow from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTableRow';
import ManagerChurnRecoveryEmptyState from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryEmptyState';
import { CANCELLATIONS_REASON_OPTIONS, CANCELLATIONS_ITEMS_PER_PAGE } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';



/** Masks a phone number: 98****2310 */
function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return phone.slice(0, 2) + '****' + phone.slice(-4);
}



const SKELETON_ROW_COUNT = 5;

export default function ManagerChurnRecoveryTable({
  members,
  allFilteredCount,
  isLoading, isError, errorMessage,
  churnSearch,
  onSearchChange,
  churnReasonFilter,
  onReasonFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onOpenComposer }: ManagerChurnRecoveryTableProps) {
  const startEntry = allFilteredCount === 0 ? 0 : (currentPage - 1) * CANCELLATIONS_ITEMS_PER_PAGE + 1;
  const endEntry   = Math.min(currentPage * CANCELLATIONS_ITEMS_PER_PAGE, allFilteredCount);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-border">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name..."
            value={churnSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg text-primary placeholder:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-colors"
            aria-label="Search churned members"
          />
        </div>

        {/* Reason Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {CANCELLATIONS_REASON_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onReasonFilterChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                churnReasonFilter === opt.value
                  ? 'bg-primary text-on-primary'
                  : 'bg-input border border-border text-secondary hover:text-on-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left" role="grid" aria-label="Churned members table">
          <thead>
            <tr className="bg-primary-subtle/30 border-b border-border">
              {MANAGER_CHURN_RECOVERY_TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
                <tr key={`churn-skeleton-${i}`} className="border-b border-border">
                  {MANAGER_CHURN_RECOVERY_TABLE_HEADERS.map((h) => (
                    <td key={h} className="px-4 py-3">
                      <div className="h-4 w-3/4 bg-skeleton-base rounded motion-safe:animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isError ? (
              <tr><td colSpan={MANAGER_CHURN_RECOVERY_TABLE_HEADERS.length} className="py-12 text-center text-danger text-sm">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</td></tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={MANAGER_CHURN_RECOVERY_TABLE_HEADERS.length}>
                  <ManagerChurnRecoveryEmptyState />
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <ManagerChurnRecoveryTableRow
                  key={member.memberId}
                  member={member}
                  onOpenComposer={onOpenComposer}
                  maskPhone={maskPhone}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {allFilteredCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border">
          <p className="text-xs text-secondary">
            Showing {startEntry}–{endEntry} of {allFilteredCount} churned members
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="p-1.5 rounded-lg border border-border text-secondary hover:text-on-primary disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-on-primary font-medium px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="p-1.5 rounded-lg border border-border text-secondary hover:text-on-primary disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
