// RESPONSIBILITY: Renders the empty-state message for White-labeling domain lists.
'use client';

import { Globe } from 'lucide-react';

export default function SuperadminWhiteLabelingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-input"><Globe size={18} className="text-secondary" aria-hidden="true" /></div>
      <h3 className="mb-1 text-lg font-bold text-primary">No Custom Domains Found</h3>
      <p className="max-w-sm text-sm text-secondary">No domains match your current search or filter criteria. Adjust your filters to see more results.</p>
    </div>
  );
}
