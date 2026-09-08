// RESPONSIBILITY: Skeleton loader for the Schedule module
import React from 'react';

export default function ManagerScheduleSkeleton() {
  return (
    <div className="min-h-full pb-10 animate-pulse motion-reduce:animate-none">
      {/* Header Skeleton */}
      <div className="px-6 py-5 border-b border-border bg-card">
        <div className="h-6 w-48 bg-skeleton-highlight rounded mb-2"></div>
        <div className="h-4 w-96 bg-skeleton-base rounded"></div>
      </div>
      
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-skeleton-base rounded-xl border border-border"></div>
          ))}
        </div>
        <div className="flex justify-between items-center h-10">
          <div className="h-10 w-72 bg-skeleton-base rounded-lg border border-border"></div>
          <div className="h-10 w-32 bg-skeleton-base rounded-lg border border-border hidden sm:block"></div>
        </div>
        <div className="h-[400px] bg-skeleton-base rounded-xl border border-border"></div>
      </div>
    </div>
  );
}
