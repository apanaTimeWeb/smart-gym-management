"use client";
// RESPONSIBILITY: Renders the feature-owned empty state when branch filters produce no visible records.
import { Building2 } from 'lucide-react';

interface AdminBranchesEmptyStateProps {
  onClearFilters: () => void;
}

export default function AdminBranchesEmptyState({ onClearFilters }: AdminBranchesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-subtle">
        <Building2 size={24} className="text-primary" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-primary">No branches found</h3>
      <p className="mt-1 max-w-md text-sm text-secondary">Try a different search or status filter to view another branch.</p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 min-h-11 rounded-lg border border-border bg-input px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base"
      >
        Clear filters
      </button>
    </div>
  );
}
