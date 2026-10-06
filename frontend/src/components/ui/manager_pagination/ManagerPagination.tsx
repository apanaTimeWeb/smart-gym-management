// RESPONSIBILITY: Renders ManagerPagination's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useId } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ManagerPaginationProps } from '@/components/ui/manager_pagination/ManagerPaginationTypes';




/** @description Renders the pagination bar (Previous/Next + page info + rows-per-page) shared across all MANAGER table views. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage }: ManagerPaginationProps) {
  const t = useTranslations('MANAGER_SHELL');
  const paginationId = useId().replace(/[^a-zA-Z0-9_-]+/g, '-');

  const startItem = totalItems !== undefined && itemsPerPage !== undefined
    ? (currentPage - 1) * itemsPerPage + 1
    : null;
  const endItem = totalItems !== undefined && itemsPerPage !== undefined
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  const getVisiblePages = (): Array<{ key: string; page: number | null }> => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, pageIndex) => ({ key: `page-${pageIndex + 1}`, page: pageIndex + 1 }));
    }
    if (currentPage <= 3) {
      return [
        { key: 'page-1', page: 1 },
        { key: 'page-2', page: 2 },
        { key: 'page-3', page: 3 },
        { key: 'page-4', page: 4 },
        { key: 'ellipsis-trailing', page: null },
        { key: `page-${totalPages}`, page: totalPages },
      ];
    }
    if (currentPage >= totalPages - 2) {
      return [
        { key: 'page-1', page: 1 },
        { key: 'ellipsis-leading', page: null },
        { key: `page-${totalPages - 3}`, page: totalPages - 3 },
        { key: `page-${totalPages - 2}`, page: totalPages - 2 },
        { key: `page-${totalPages - 1}`, page: totalPages - 1 },
        { key: `page-${totalPages}`, page: totalPages },
      ];
    }
    return [
      { key: 'page-1', page: 1 },
      { key: 'ellipsis-leading', page: null },
      { key: `page-${currentPage - 1}`, page: currentPage - 1 },
      { key: `page-${currentPage}`, page: currentPage },
      { key: `page-${currentPage + 1}`, page: currentPage + 1 },
      { key: 'ellipsis-trailing', page: null },
      { key: `page-${totalPages}`, page: totalPages },
    ];
  };

  return (
    <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
      {startItem !== null && endItem !== null && totalItems !== undefined ? (
        <div className="text-sm text-center sm:text-left text-secondary">{t("COPY_SHOWING")}<span className="font-medium text-primary">{startItem}</span>{t("COPY_TO")}{' '}
          <span className="font-medium text-primary">{endItem}</span>{t("COPY_OF")}{' '}
          <span className="font-medium text-primary">{totalItems}</span>{t("COPY_RESULTS")}</div>
      ) : (
        <div className="text-sm text-secondary">{t("COPY_PAGE")}<span className="font-medium text-primary">{currentPage}</span>{t("COPY_OF")}{' '}
          <span className="font-medium text-primary">{totalPages}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:bg-surface-hover hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`ui-pagination-button-previous-${paginationId}`}
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={t("COPY_GO_PREVIOUS_PAGE")}
          
        >
          <ChevronLeft size={18} strokeWidth={2}/>
        </button>

        <div className="flex items-center gap-1 mx-1" aria-label={t("COPY_PAGINATION")}>
          {getVisiblePages().map((item) => (
            item.page === null ? (
              <span key={item.key} className="px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 min-w-11 flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all ${
                  currentPage === item.page
                    ? 'bg-primary text-on-primary'
                    : 'text-secondary hover:bg-surface-hover hover:text-primary'
                } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`ui-pagination-page-${paginationId}-${item.page}`}
                type="button"
                key={item.key}
                onClick={() => onPageChange(item.page as number)}
                aria-current={currentPage === item.page ? 'page' : undefined}
                aria-label={t("TEXT_GO_TO_PAGE", { value: item.page })}
              >
                {item.page}
              </button>
            )
          ))}
        </div>

        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:bg-surface-hover hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`ui-pagination-button-next-${paginationId}`}
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label={t("COPY_GO_NEXT_PAGE")}
          
        >
          <ChevronRight size={18} strokeWidth={2}/>
        </button>
      </div>
    </div>
  );
}
