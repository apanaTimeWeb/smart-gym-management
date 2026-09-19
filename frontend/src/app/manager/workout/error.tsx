'use client';

// RESPONSIBILITY: Renders the module-specific route error fallback and records safe diagnostic metadata.
import { ManagerWorkoutUrlConfig } from '@/app/manager/workout/workout_url_config';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function ManagerWorkoutError({
  error,
  reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Manager module route error', {
      route: ManagerWorkoutUrlConfig.UI.HOME,
      module: 'manager/workout',
      errorDigest: error.digest,
      timestamp: new Date().toISOString() });
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page">
      <div className="bg-overlay border border-danger/20 p-8 rounded-2xl shadow-dialog max-w-md w-full text-center space-y-4">
        <div className="w-14 h-14 bg-danger/10 rounded-full flex items-center justify-center mx-auto text-danger">
          <AlertTriangle size={18} />
        </div>
        <h2 className="text-xl font-bold text-primary">Workout Unavailable</h2>
        <p className="text-sm text-secondary">We couldn't load the workout module. Please try again.</p>
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
