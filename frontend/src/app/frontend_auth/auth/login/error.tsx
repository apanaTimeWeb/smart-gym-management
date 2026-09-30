// RESPONSIBILITY: Renders the safe Login route-error recovery UI and invokes the Next.js reset action.
'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { logger } from '@/lib/logger';
import type { AuthLoginRouteErrorProps } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginErrorTypes';

/**
 * Handles uncaught Login route-segment errors with safe translated messaging and reset().
 * @description Logs the current error instance and prevents technical details from reaching the UI.
 * @dependencies Next.js route error contract, centralized logger, and Login-local translations.
 * @edge-case Repeated rerenders of the same error object do not duplicate the logging effect.
 */
export default function Error({ error, reset }: AuthLoginRouteErrorProps) {
  const t = useTranslations('AUTH_LOGIN');

  // Logs the current route error instance while avoiding duplicate logging caused by unrelated rerenders.
  useEffect(() => {
    logger.error('Auth login route error', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-page p-6">
      <section
        data-testid="auth-login-route-error"
        className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-card"
        role="alert"
      >
        <h2 className="mb-2 text-section-title font-semibold text-primary">{t('ROUTE_ERROR.TITLE')}</h2>
        <p className="mb-6 text-sm text-secondary">{t('ROUTE_ERROR.DESCRIPTION')}</p>
        <button
          type="button"
          data-testid="auth-login-route-error-retry"
          onClick={reset}
          className="min-h-11 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          {t('ROUTE_ERROR.RETRY')}
        </button>
      </section>
    </main>
  );
}
