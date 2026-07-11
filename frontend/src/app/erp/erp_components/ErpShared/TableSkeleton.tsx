import React from 'react';

export const TableSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden mt-4">
      <div className="w-full h-[50px] bg-[rgba(99,102,241,0.08)] border-b border-[var(--border)]"></div>
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 h-[60px] border-b border-[var(--border)] animate-pulse">
            <div className="h-4 bg-[var(--bg-input)] rounded w-1/4"></div>
            <div className="h-4 bg-[var(--bg-input)] rounded w-1/5"></div>
            <div className="h-4 bg-[var(--bg-input)] rounded w-1/6"></div>
            <div className="h-4 bg-[var(--bg-input)] rounded w-1/4"></div>
            <div className="h-4 bg-[var(--bg-input)] rounded w-12 ml-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
