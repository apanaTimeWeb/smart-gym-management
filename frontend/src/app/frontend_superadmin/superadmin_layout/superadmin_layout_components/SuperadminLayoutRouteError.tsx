// RESPONSIBILITY: Shared App Router error surface for role-owned child routes; never exposes raw exceptions.
'use client';
import { useTranslations } from 'next-intl';

import type { SuperadminNextErrorProps } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes';

/**
 * @description Renders the localized route-level recovery state used by role-owned App Router error boundaries.
 * @dependencies Uses only the role translation namespace and caller-provided reset callback.
 * @edge-case Ignores the raw framework error object so sensitive exception details never reach the UI.
 */
export default function SuperadminLayoutRouteError({ reset }: SuperadminNextErrorProps) {
  const t = useTranslations('superadmin_layout');
  return (
    <main className="flex min-h-96 items-center justify-center p-6" aria-labelledby="superadmin_layout-route-error-title">
      <section className="w-full max-w-lg space-y-4 rounded-xl border border-border bg-overlay p-7 shadow-dialog text-center" role="alert" data-testid="superadmin_layout-route-error-state">
        <h1 id="superadmin_layout-route-error-title" className="text-xl font-semibold text-primary">{t('ui.error_title')}</h1>
        <p className="text-sm text-secondary">{t('ui.error_description')}</p>
        <button type="button" onClick={reset} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_layout-route-error-retry">{t('ui.retry')}</button>
      </section>
    </main>
  );
}
