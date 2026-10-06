// RESPONSIBILITY: Renders ManagerTableSkeleton's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import type { ManagerTableSkeletonProps } from '@/components/ui/manager_table_skeleton/ManagerTableSkeletonTypes';

/**
 * @description Renders/orchestrates the ManagerTableSkeleton user interface for the manager infrastructure module without owning sibling business logic.
 * @dependencies @/components/ui/manager_table_skeleton/ManagerTableSkeletonTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const SKELETON_ROW_KEYS = ['row-a', 'row-b', 'row-c', 'row-d', 'row-e', 'row-f', 'row-g', 'row-h'] as const;

/** @description Renders a table-shaped loading skeleton using the global semantic skeleton tokens and documented 48px row geometry. @dependencies Feature-local imports are used as declared. @edge-case Preserves documented UI states and accessibility behavior. */
export const ManagerTableSkeleton = ({ rows = 6 }: ManagerTableSkeletonProps) => {
  const visibleRows = SKELETON_ROW_KEYS.slice(0, Math.min(rows, SKELETON_ROW_KEYS.length));
  return (
    <div className="mt-4 w-full overflow-hidden rounded-xl border border-border bg-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
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
