'use client';
import { useEffect } from 'react';

export default function AdminCampaignsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Campaigns Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-danger/20 bg-danger/5 px-6 py-12 text-center">
      <div className="rounded-full bg-danger/10 p-3 mb-4">
        <span className="text-danger">⚠️</span>
      </div>
      <h2 className="mb-2 text-lg font-semibold text-primary">Failed to load Campaigns</h2>
      <p className="mb-6 text-sm text-secondary">
        We encountered an error loading the marketing dashboard. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-on-danger hover:bg-danger/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
