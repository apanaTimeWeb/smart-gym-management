"use client";
// RESPONSIBILITY: Renders the zero-business pagination primitive for Admin tables. Data/filter semantics remain owned by each feature.
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AdminPaginationProps } from '@/app/admin/admin_layout/AdminShared/AdminPaginationTypes';

function getVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages];
  if (currentPage >= totalPages - 2) return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

export default function AdminPagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: AdminPaginationProps) {
  const hasSummary = totalItems !== undefined && itemsPerPage !== undefined && totalItems > 0;
  const startItem = hasSummary ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = hasSummary ? Math.min(currentPage * itemsPerPage, totalItems) : null;
  const safeTotalPages = Math.max(totalPages, 1);

  return (
    <nav className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-border" aria-label="Pagination">
      {hasSummary && startItem !== null && endItem !== null ? (
        <div className="text-sm text-center sm:text-left text-secondary" aria-live="polite">
          Showing <span className="font-medium text-primary">{startItem}</span> to{' '}
          <span className="font-medium text-primary">{endItem}</span> of{' '}
          <span className="font-medium text-primary">{totalItems}</span> results
        </div>
      ) : (
        <div className="text-sm text-secondary" aria-live="polite">
          Page <span className="font-medium text-primary">{currentPage}</span> of{' '}
          <span className="font-medium text-primary">{safeTotalPages}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-all motion-safe:duration-fast motion-safe:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1 mx-1">
          {getVisiblePages(currentPage, safeTotalPages).map((page, index) => (
            page === 'ellipsis' ? (
              <span key={`ellipsis-${index + 1}`} className="min-w-11 text-center px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all motion-safe:duration-fast motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'text-secondary hover:bg-surface-hover hover:text-primary'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
          disabled={currentPage >= safeTotalPages}
          aria-label="Next page"
          className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-all motion-safe:duration-fast motion-safe:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
