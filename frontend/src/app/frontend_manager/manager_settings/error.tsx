// RESPONSIBILITY: Renders the manager settings route-segment error fallback and exposes the documented retry action.
'use client';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { logger } from '@/lib/logger';
import { ManagerSettingsUrlConfig } from '@/app/frontend_manager/manager_settings/manager_settings_url_config';


/** @description Route-level ManagerSettingsError for the Manager frontend module. */
export default function ManagerSettingsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('MANAGER_SETTINGS');

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    logger.error('Manager settings route error', { route: ManagerSettingsUrlConfig.PAGES.SETTINGS, module: 'manager/settings', errorDigest: error.digest, timestamp: new Date().toISOString() });
  }, [error]);
  return (
    <div className="flex min-h-full items-center justify-center bg-page p-6">
      <div role="alert" aria-live="assertive" className="w-full max-w-md space-y-4 rounded-2xl border border-danger bg-overlay p-8 text-center shadow-dialog" data-testid="manager_settings-error-error">
        <div data-testid="manager_settings-error-status" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger-bg text-danger"><AlertTriangle size={18} strokeWidth={2} aria-hidden="true" /></div>
        <h2 className="text-xl font-bold text-primary">{t("COPY_SETTINGS_UNAVAILABLE")}</h2>
        <p data-testid="manager_settings-error-message" className="text-sm text-secondary">{t("COPY_WE_COULDN_T_LOAD_SETTINGS_MODULE_TRY_AGAIN")}</p>
        <button data-testid="manager_settings-error-retry" type="button" onClick={reset} className="min-h-11 rounded-xl bg-primary px-6 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110">{t("COPY_TRY_AGAIN")}</button>
      </div>
    </div>
  );
}
