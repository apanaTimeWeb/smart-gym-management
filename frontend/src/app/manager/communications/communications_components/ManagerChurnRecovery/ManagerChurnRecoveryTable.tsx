// RESPONSIBILITY: Paginated, searchable, filterable table of churned/exited members in the Churn Recovery tab.
'use client';

import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ManagerChurnRecoveryTableRow from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTableRow';
import ManagerChurnRecoveryEmptyState from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryEmptyState';
import type { ChurnedMember, FetchState } from '@/app/manager/communications/communications_types/communications_types';
import { CHURN_REASON_OPTIONS, CHURN_ITEMS_PER_PAGE } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

interface ManagerChurnRecoveryTableProps {
  members: ChurnedMember[];
  allFilteredCount: number;
  fetchState: FetchState;
  churnSearch: string;
  onSearchChange: (s: string) => void;
  churnReasonFilter: string;
  onReasonFilterChange: (r: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onOpenComposer: (memberId: string) => void;
}

/** Masks a phone number: 98****2310 */
function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return phone.slice(0, 2) + '****' + phone.slice(-4);
}

const TABLE_HEADERS = ['Member / Plan', 'Phone', 'Exit Date', 'Since Exit', 'Reason', 'Status', 'Action'];

const SKELETON_ROW_COUNT = 5;

export default function ManagerChurnRecoveryTable({
  members,
  allFilteredCount,
  fetchState,
  churnSearch,
  onSearchChange,
  churnReasonFilter,
  onReasonFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onOpenComposer,
}: ManagerChurnRecoveryTableProps) {
  const startEntry = allFilteredCount === 0 ? 0 : (currentPage - 1) * CHURN_ITEMS_PER_PAGE + 1;
  const endEntry   = Math.min(currentPage * CHURN_ITEMS_PER_PAGE, allFilteredCount);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-border">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name..."
            value={churnSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-colors"
            aria-label="Search churned members"
          />
        </div>

        {/* Reason Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {CHURN_REASON_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onReasonFilterChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                churnReasonFilter === opt.value
                  ? 'bg-primary text-black'
                  : 'bg-input border border-border text-secondary hover:text-foreground'
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
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-3 text-[11px] font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fetchState === 'loading' ? (
              Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  {TABLE_HEADERS.map((h) => (
                    <td key={h} className="px-4 py-3">
                      <div className="h-4 bg-skeleton-base rounded motion-safe:animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length}>
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
              className="p-1.5 rounded-lg border border-border text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-foreground font-medium px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="p-1.5 rounded-lg border border-border text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
