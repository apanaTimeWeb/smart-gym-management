// RESPONSIBILITY: Renders/orchestrates not-found for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
"use client";
import { useTranslations } from 'next-intl';
import { ADMIN_DASHBOARD_URL } from '@/app/frontend_admin/admin_layout/admin_layout_url_config';
import Link from 'next/link';

/**
 * NotFound is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center px-4">
      <h2 className="text-2xl font-bold text-primary mb-2">{t('hr.NotFound.text_e637d9faea')}</h2>
      <p className="text-secondary mb-6 max-w-md">
        {t('hr.NotFound.text_0b7e734f76')}</p>
      <Link data-testid="admin_hr-admin_hr-performance-not-found-state" href={ADMIN_DASHBOARD_URL} className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        {t('hr.NotFound.text_cdac261089')}</Link>
    </div>
  );
}