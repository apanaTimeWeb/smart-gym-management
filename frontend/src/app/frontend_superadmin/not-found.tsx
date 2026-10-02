'use client';// RESPONSIBILITY: Renders the frontend_superadmin role-level not-found recovery surface; it owns no business state.
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { MODULE_URLS as SUPERADMIN_DASHBOARD_URLS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';



/**
 * @description Renders the role-level 404 state for unmatched Superadmin routes.
 * @dependencies Uses role-level layout translations only; business navigation remains feature-owned.
 * @edge-case Recovery always returns to the Superadmin dashboard and never crosses into another role container.
 */
export default function SuperadminRoleNotFound() {
  const t = useTranslations('SuperadminLayoutStyles');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page p-6 text-center" data-testid="frontend-superadmin-not-found-state">
      <span className="text-lg font-bold text-secondary" aria-hidden="true">404</span>
      <h1 className="text-xl font-bold text-primary">{t('ui.page_not_found_title_v3')}</h1>
      <p className="max-w-md text-sm text-secondary">{t('ui.page_not_found_message_v3')}</p>
      <Link href={SUPERADMIN_DASHBOARD_URLS.PAGES.MAIN} data-testid="frontend-superadmin-not-found-back" className="min-h-11 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('ui.back_to_dashboard_v3')}</Link>
    </div>
  );
}
