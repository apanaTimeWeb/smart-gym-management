'use client';

// RESPONSIBILITY: Renders the module-specific route error fallback and records safe diagnostic metadata.
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function ManagerReferralsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Manager module route error', {
      route: '/manager/referrals',
      module: 'manager/referrals',
      errorDigest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page">
      <div className="bg-card border border-danger/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
        <div className="w-14 h-14 bg-danger/10 rounded-full flex items-center justify-center mx-auto text-danger">
          <AlertTriangle size={28} />
        </div>
        <h2 className="text-xl font-bold text-foreground">Referrals Unavailable</h2>
        <p className="text-sm text-secondary">We couldn't load the referrals module. Please try again.</p>
        {error.digest && <p className="text-xs text-secondary/60">Ref: {error.digest}</p>}
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 motion-safe:transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
