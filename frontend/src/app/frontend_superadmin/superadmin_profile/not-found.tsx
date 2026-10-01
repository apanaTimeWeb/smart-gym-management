// RESPONSIBILITY: Renders the superadmin_profile route-segment not-found state and provides the documented recovery navigation.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { SuperadminProfileUrlConfig } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';

/**
 * @description Renders the recoverable not-found state for the superadmin_profile route segment.
 * @dependencies Uses only module-local translations and centralized route configuration.
 * @edge-case Provides keyboard-focus-visible navigation back to the owning module without exposing route internals.
 */
export default function SuperadminProfileNotFound() {
  const t = useTranslations('superadmin_profile');
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center" data-testid="superadmin_profile-not-found-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-floating" aria-hidden="true">
        <span className="text-2xl font-bold text-secondary">404</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary">{t('ui.page_not_found_title_v3')}</h2>
        <p className="mt-1 max-w-md text-sm text-secondary">{t('ui.page_not_found_message_v3')}</p>
      </div>
      <Link href={SuperadminProfileUrlConfig.PAGES.MAIN} data-testid="superadmin_profile-not-found-back" className="min-h-11 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('ui.back_to_module_v3')}</Link>
    </div>
  );
}
