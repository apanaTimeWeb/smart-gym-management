"use client";
// RESPONSIBILITY: Renders the pagination bar (Previous/Next + page info + rows-per-page) shared across all TRAINER table views.
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerInfrastructurePaginationPageItem } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_types/TrainerInfrastructurePaginationPageItem';

import type { TrainerInfrastructurePaginationProps } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_types/TrainerInfrastructurePaginationProps';







/**
 * @description Owns TrainerInfrastructurePagination behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders pagination controls for the infrastructure feature while preserving current query/URL state and keyboard accessibility.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructurePagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: TrainerInfrastructurePaginationProps) {
  const t = useTranslations('TRAINER_SHELL');
  const startItem = totalItems !== undefined && itemsPerPage !== undefined && totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems !== undefined && itemsPerPage !== undefined ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  const getVisiblePages = (): TrainerInfrastructurePaginationPageItem[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages];
    if (currentPage >= totalPages - 2) return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  };

  return (
    <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
      {startItem !== null && endItem !== null && totalItems !== undefined ? (
        <div className="text-sm text-center sm:text-start text-secondary">
          {t("TEXT_SHOWING")}<span className="font-medium text-primary">{startItem}</span> {t("TEXT_TO")}<span className="font-medium text-primary">{endItem}</span> {t("TEXT_OF")}<span className="font-medium text-primary">{totalItems}</span> {t("TEXT_RESULTS")}</div>
      ) : (
        <div className="text-sm text-secondary">{t("TEXT_PAGE")}<span className="font-medium text-primary">{currentPage}</span> {t("TEXT_OF")}<span className="font-medium text-primary">{totalPages}</span></div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1 max-w-full">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={t("TEXT_PREVIOUS_PAGE")}
          className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_infrastructure-trainerinfrastructurepagination-button_1">
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1 mx-1 max-w-full">
          {getVisiblePages().map((page, index) =>
            page === 'ellipsis' ? (
              <span key={`dots-${index}`} className="px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={t("TEXT_GO_TO_PAGE", { page })}
                className={`min-w-11 min-h-11 flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${currentPage === page ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary hover:bg-input'} motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
               data-testid={`trainer_infrastructure-pagination-page-${page}`}>
                {page}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={t("TEXT_NEXT_PAGE")}
          className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_infrastructure-trainerinfrastructurepagination-button_3">
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
