'use client';
// RESPONSIBILITY: Empty state shown when no churn alerts match the active filter.

import { ShieldCheck } from 'lucide-react';

interface SuperadminChurnEmptyStateProps {
  isFiltered: boolean;
  onClearFilter: () => void;
}

export default function SuperadminChurnEmptyState({ isFiltered, onClearFilter }: SuperadminChurnEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-14 h-14 rounded-full bg-success-bg flex items-center justify-center mb-4">
        <ShieldCheck size={28} strokeWidth={2} className="text-success" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {isFiltered ? 'No alerts match your filter' : 'No churn alerts — platform is healthy'}
      </h3>
      <p className="text-sm text-secondary max-w-xs">
        {isFiltered
          ? 'Try adjusting your search or filter criteria.'
          : 'All tenants are active and engaged. Check back later.'}
      </p>
      {isFiltered && (
        <button
          onClick={onClearFilter}
          className="mt-4 text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
