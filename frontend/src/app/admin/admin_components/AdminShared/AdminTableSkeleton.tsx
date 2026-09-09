// RESPONSIBILITY: Renders animated skeleton loader rows that match the data table layout. Used as placeholder while API data loads (Rule 26).
import React from 'react';

export const AdminTableSkeleton = ({ rows = 6, columns = 5, cols }: { rows?: number; columns?: number; cols?: number }) => {
  return (
    <div className="w-full bg-card border border-border rounded-xl overflow-hidden mt-4">
      <div className="w-full h-12 bg-primary/10 border-b border-border"></div>
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 h-15 border-b border-border motion-safe:animate-pulse">
            {Array.from({ length: cols || columns }).map((_, j) => (
              <div key={j} className="h-4 bg-input rounded flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableSkeleton;
