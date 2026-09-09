// RESPONSIBILITY: Renders the pagination bar (Previous/Next + page info + rows-per-page) shared across all ADMIN table views.
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Optional detailed info props
  totalItems?: number;
  itemsPerPage?: number;
  // Optional color overrides (uses CSS vars by default)
  colors?: {
    text?: string;
    textActive?: string;
    bgActive?: string;
    border?: string;
    hoverBg?: string;
  };
}

export default function AdminPagination({ 
  currentPage, 
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  colors,
}: AdminPaginationProps) {

  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  const bgActive = colors?.bgActive ?? 'bg-primary';
  const textActive = colors?.textActive ?? 'text-white';
  const textColor = colors?.text ?? 'text-secondary';
  const borderColor = colors?.border ?? 'border-border';

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div 
      className={`px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${borderColor}`}
    >
      {startItem !== null && endItem !== null && totalItems !== undefined ? (
        <div className={`text-sm text-center sm:text-left ${textColor}`}>
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </div>
      ) : (
        <div className={`text-sm ${textColor}`}>
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${textColor} hover:bg-black/5 dark:hover:bg-white/5`}
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center gap-1 mx-1">
          {getVisiblePages().map((p, i) => (
            p === '...' ? (
              <span key={`dots-${i}`} className={`px-2 ${textColor}`}>...</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  currentPage === p 
                    ? `${bgActive} ${textActive}`
                    : `${textColor} hover:bg-black/5 dark:hover:bg-white/5`
                }`}
              >
                {p}
              </button>
            )
          ))}
        </div>

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${textColor} hover:bg-black/5 dark:hover:bg-white/5`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
