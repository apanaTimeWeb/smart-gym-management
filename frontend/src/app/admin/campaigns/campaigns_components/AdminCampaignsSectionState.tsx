'use client';
// RESPONSIBILITY: Renders section-level loading and retry states for Campaigns data pickers.
import { RefreshCw } from 'lucide-react';

export interface AdminCampaignsSectionStateProps {
  message: string;
  loading?: boolean;
  retry?: () => void;
}

export default function AdminCampaignsSectionState({ message, loading = false, retry }: AdminCampaignsSectionStateProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-busy={loading} aria-live="polite">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? [1, 2, 3, 4].map((item) => <div key={`campaigns-section-skeleton-${item}`} className="h-20 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" aria-hidden="true" />) : (
          <div className="sm:col-span-2 lg:col-span-4 text-center">
            <p className="text-sm text-secondary">{message}</p>
            {retry && (
              <button type="button" onClick={retry} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <RefreshCw size={15} aria-hidden="true" />
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
