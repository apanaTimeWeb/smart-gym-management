// RESPONSIBILITY: Renders AdminCampaignsError for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
'use client';
import { useEffect } from 'react';
import { logErrorToMonitoring } from '@/app/admin/admin_layout/admin_utils/AdminMonitoring';

export default function AdminCampaignsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
// EFFECT: Synchronizes this component effect with its declared React dependencies in campaigns/error.tsx.
  useEffect(() => {
    logErrorToMonitoring(error, { module: 'campaigns', route: '/admin/campaigns' });
  }, [error]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-danger bg-danger-bg px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-danger-bg p-3"><span className="text-danger" aria-hidden="true">⚠️</span></div>
      <h2 className="mb-2 text-lg font-semibold text-primary">Failed to load Campaigns</h2>
      <p className="mb-6 text-sm text-secondary">We encountered an error loading the marketing dashboard. Please try again.</p>
      <button type="button" onClick={reset} className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-on-danger motion-safe:transition-colors motion-safe:duration-base hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Try Again</button>
    </div>
  );
}
