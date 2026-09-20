'use client';
// RESPONSIBILITY: Route-segment error boundary for Manager Settings; logs safe diagnostics and exposes the framework reset action.
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import { ManagerSettingsUrlConfig } from '@/app/manager/settings/settings_url_config';

export default function ManagerSettingsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    logger.error('Manager settings route error', { route: ManagerSettingsUrlConfig.PAGES.SETTINGS, module: 'manager/settings', errorDigest: error.digest, timestamp: new Date().toISOString() });
  }, [error]);
  return (
    <div className="flex min-h-full items-center justify-center bg-page p-6">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-danger bg-overlay p-8 text-center shadow-dialog">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger-bg text-on-danger"><AlertTriangle size={18} aria-hidden="true" /></div>
        <h2 className="text-xl font-bold text-primary">Settings Unavailable</h2>
        <p className="text-sm text-secondary">We couldn't load the settings module. Please try again.</p>
        <button type="button" onClick={reset} className="min-h-11 rounded-xl bg-primary px-6 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base">Try Again</button>
      </div>
    </div>
  );
}
