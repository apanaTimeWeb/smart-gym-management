'use client';
// RESPONSIBILITY: Renders the pagination bar (Previous/Next + page info + rows-per-page) shared across all MANAGER table views.
import type { ManagerPaginationProps } from '@/app/manager/manager_components/ManagerShared/manager_shared_types/ManagerPaginationTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';



export default function ManagerPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage }: ManagerPaginationProps) {
  const startItem = totalItems !== undefined && itemsPerPage !== undefined
    ? (currentPage - 1) * itemsPerPage + 1
    : null;
  const endItem = totalItems !== undefined && itemsPerPage !== undefined
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  const getVisiblePages = (): Array<number | string> => {
    const pages: Array<number | string> = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  return (
    <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
      {startItem !== null && endItem !== null && totalItems !== undefined ? (
        <div className="text-sm text-center sm:text-left text-secondary">
          Showing <span className="font-medium text-primary">{startItem}</span> to{' '}
          <span className="font-medium text-primary">{endItem}</span> of{' '}
          <span className="font-medium text-primary">{totalItems}</span> results
        </div>
      ) : (
        <div className="text-sm text-secondary">
          Page <span className="font-medium text-primary">{currentPage}</span> of{' '}
          <span className="font-medium text-primary">{totalPages}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:bg-surface-hover hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1 mx-1" aria-label="Pagination">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span key={`dots-${index}`} className="px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button
                type="button"
                key={page}
                onClick={() => onPageChange(page as number)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
                className={`min-h-11 min-w-11 flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'text-secondary hover:bg-surface-hover hover:text-on-primary'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Go to next page"
          className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:bg-surface-hover hover:text-on-primary disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
