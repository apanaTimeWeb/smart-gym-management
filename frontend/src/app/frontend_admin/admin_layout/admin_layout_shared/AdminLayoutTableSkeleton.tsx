"use client";
// RESPONSIBILITY: Renders zero-business table skeleton rows that mirror the shape of data tables during loading.
import { useTranslations } from 'next-intl';
import type { AdminTableSkeletonProps } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_shared_types/AdminLayoutTableSkeletonTypes';

/**
 * AdminLayoutTableSkeleton renders the admin table skeleton UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminLayoutTableSkeleton({ rows = 6, columns = 5, cols }: AdminTableSkeletonProps) {
  const t = useTranslations();
  const visibleColumns = Math.max(1, cols ?? columns);
  return (
    <div className="w-full bg-card border border-border rounded-lg overflow-hidden mt-4" aria-busy="true" aria-label={t('admin_layout.AdminLayoutTableSkeleton.text_loading_table')}>
      <div className="w-full h-12 bg-surface-highlight border-b border-border" />
      <div className="flex flex-col">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={`skeleton-row-${rowIndex + 1}`} className="flex items-center gap-4 px-6 h-12 border-b border-border motion-safe:animate-pulse motion-safe:duration-base">
            {Array.from({ length: visibleColumns }, (_, columnIndex) => (
              <div key={`skeleton-cell-${rowIndex + 1}-${columnIndex + 1}`} className="h-4 bg-skeleton-base rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
