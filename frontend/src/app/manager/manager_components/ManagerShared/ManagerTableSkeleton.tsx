// RESPONSIBILITY: Renders a table-shaped loading skeleton using the global semantic skeleton tokens and documented 48px row geometry.
'use client';
import type { ManagerTableSkeletonProps } from '@/app/manager/manager_components/ManagerShared/manager_shared_types/ManagerTableSkeletonTypes';

const SKELETON_ROW_KEYS = ['row-a', 'row-b', 'row-c', 'row-d', 'row-e', 'row-f', 'row-g', 'row-h'] as const;

export const ManagerTableSkeleton = ({ rows = 6 }: ManagerTableSkeletonProps) => {
  const visibleRows = SKELETON_ROW_KEYS.slice(0, Math.min(rows, SKELETON_ROW_KEYS.length));
  return (
    <div className="mt-4 w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="h-12 w-full border-b border-border bg-surface-highlight" />
      <div className="flex flex-col">
        {visibleRows.map((key) => (
          <div key={key} className="flex h-12 items-center gap-4 border-b border-border px-6 motion-safe:animate-pulse">
            <div className="h-4 w-1/4 rounded bg-skeleton-base" />
            <div className="h-4 w-1/5 rounded bg-skeleton-base" />
            <div className="h-4 w-1/6 rounded bg-skeleton-base" />
            <div className="h-4 w-1/4 rounded bg-skeleton-base" />
            <div className="ml-auto h-4 w-12 rounded bg-skeleton-base" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerTableSkeleton;
