// RESPONSIBILITY: Renders a semantic table-shaped loading skeleton with the requested row/column geometry.
import React from 'react';
import type { TrainerTableSkeletonProps } from '@/app/trainer/trainer_components/trainer_components_types/TrainerTableSkeletonProps';

export default function TrainerTableSkeleton({ rows = 6, columns = 5 }: TrainerTableSkeletonProps) {
  return (
    <div className="w-full bg-card border border-border rounded-xl overflow-hidden mt-4" aria-busy="true" aria-label="Loading table">
      <div className="h-12 bg-surface-highlight border-b border-border motion-safe:animate-pulse" />
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`skeleton-row-${rowIndex}`} className="flex items-center gap-4 px-6 min-h-12 border-b border-border">
            {Array.from({ length: columns }).map((__, columnIndex) => (
              <div
                key={`skeleton-cell-${rowIndex}-${columnIndex}`}
                className={`h-4 bg-input rounded motion-safe:animate-pulse ${columnIndex === columns - 1 ? 'w-16 ml-auto' : 'flex-1 max-w-56'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
