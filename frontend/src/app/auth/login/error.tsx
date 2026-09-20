'use client';
/**
 * RESPONSIBILITY: Handles uncaught Login route-segment errors with safe messaging, structured logging, and the mandated reset action.
 * DATA FLOW: Next.js route error -> logger -> user-safe fallback -> reset().
 */
import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';
import type { LoginRouteErrorProps } from '@/app/auth/login/login_types/LoginErrorTypes';

export default function Error({ error, reset }: LoginRouteErrorProps) {
  useEffect(() => {
    logger.error('Auth login route error', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-page p-6">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-card" role="alert">
        <h2 className="mb-2 text-xl font-bold text-primary">{LoginSharedConstants.TEXT.ROUTE_ERROR_TITLE}</h2>
        <p className="mb-6 text-sm text-secondary">{LoginSharedConstants.TEXT.ROUTE_ERROR_DESCRIPTION}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="min-h-11 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          {LoginSharedConstants.TEXT.ROUTE_ERROR_RETRY}
        </button>
      </section>
    </main>
  );
}
