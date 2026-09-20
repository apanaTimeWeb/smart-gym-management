import type { ReactNode } from 'react';

// RESPONSIBILITY: Renders the loading skeleton for the selected Admin branch detail section.
export default function AdminBranchesDetailLoading() {
  return (
    <div className="space-y-3" aria-live="polite" aria-label="Loading branch details">
      {['detail-1', 'detail-2', 'detail-3', 'detail-4'].map((item) => <div key={item} className="h-20 rounded-xl border border-border bg-input motion-safe:animate-pulse motion-safe:duration-base" />)}
    </div>
  );
}
