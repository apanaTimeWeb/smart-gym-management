// RESPONSIBILITY: Renders the manager library route-segment error fallback and exposes the documented retry action.
'use client';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { logger } from '@/lib/logger';
import { ManagerLibraryUrlConfig } from '@/app/frontend_manager/manager_library/manager_library_url_config';


/** @description Route-level ManagerLibraryError for the Manager frontend module. */
export default function ManagerLibraryError({
  error,
  reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('MANAGER_LIBRARY');

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    logger.error('Manager module route error', {
      route: ManagerLibraryUrlConfig.PAGES.LIBRARY,
      module: 'manager/library',
      errorDigest: error.digest,
      timestamp: new Date().toISOString() });
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page">
      <div role="alert" aria-live="assertive" className="bg-overlay border border-danger p-8 rounded-2xl shadow-dialog max-w-md w-full text-center space-y-4" data-testid="manager_library-error-error">
        <div data-testid="manager_library-error-status" className="w-14 h-14 bg-danger-bg rounded-full flex items-center justify-center mx-auto text-danger">
          <AlertTriangle size={18} strokeWidth={2} />
        </div>
        <h2 className="text-xl font-bold text-primary">{t("COPY_DIET_LIBRARY_UNAVAILABLE")}</h2>
        <p data-testid="manager_library-error-message" className="text-sm text-secondary">{t("COPY_WE_COULDN_T_LOAD_DIET_EXERCISE_LIBRARY_TRY_AGAIN")}</p>
        <button data-testid="manager_library-error-retry"
          onClick={reset}
          className="min-h-11 min-w-32 px-6 py-2.5 bg-primary text-on-primary font-medium rounded-xl motion-safe:transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
        >{t("COPY_TRY_AGAIN")}</button>
      </div>
    </div>
  );
}
