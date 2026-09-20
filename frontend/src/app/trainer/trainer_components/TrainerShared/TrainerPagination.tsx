'use client';
// RESPONSIBILITY: Renders the pagination bar (Previous/Next + page info + rows-per-page) shared across all TRAINER table views.
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TrainerPaginationProps } from '@/app/trainer/trainer_components/trainer_components_types/TrainerPaginationProps';



export default function TrainerPagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: TrainerPaginationProps) {
  const startItem = totalItems !== undefined && itemsPerPage !== undefined ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems !== undefined && itemsPerPage !== undefined ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  const getVisiblePages = (): Array<number | "..."> => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
      {startItem !== null && endItem !== null && totalItems !== undefined ? (
        <div className="text-sm text-center sm:text-left text-secondary">
          Showing <span className="font-medium text-primary">{startItem}</span> to <span className="font-medium text-primary">{endItem}</span> of <span className="font-medium text-primary">{totalItems}</span> results
        </div>
      ) : (
        <div className="text-sm text-secondary">Page <span className="font-medium text-primary">{currentPage}</span> of <span className="font-medium text-primary">{totalPages}</span></div>
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-1 mx-1">
          {getVisiblePages().map((page, index) =>
            page === '...' ? (
              <span key={`dots-${index}`} className="px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${currentPage === page ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary hover:bg-input'}`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
