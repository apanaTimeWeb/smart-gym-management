// RESPONSIBILITY: Renders the module-specific route error fallback and records safe diagnostic metadata.
'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { logger } from '@/lib/logger';
import { ManagerPtUrlConfig } from '@/app/manager/pt/pt_url_config';


export default function ManagerPtError({
  error,
  reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    logger.error('Manager module route error', {
      route: ManagerPtUrlConfig.UI.HOME,
      module: 'manager/pt',
      errorDigest: error.digest,
      timestamp: new Date().toISOString() });
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page">
      <div className="bg-overlay border border-danger p-8 rounded-2xl shadow-dialog max-w-md w-full text-center space-y-4">
        <div className="w-14 h-14 bg-danger-bg rounded-full flex items-center justify-center mx-auto text-danger">
          <AlertTriangle size={18} />
        </div>
        <h2 className="text-xl font-bold text-primary">Personal Training Unavailable</h2>
        <p className="text-sm text-secondary">We couldn't load the personal training module. Please try again.</p>
                <button
          onClick={reset}
          className="min-h-11 min-w-32 px-6 py-2.5 bg-primary text-on-primary font-medium rounded-xl hover:opacity-90 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
