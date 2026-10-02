'use client';
// RESPONSIBILITY: Renders the not-found component and its associated UI logic.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';


export default function GymNotFound() {
  const t = useTranslations('superadmin_gyms');
    return (<div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center p-8" data-testid="superadmin_gyms-not-found-not-found-not-found">
      <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-card">
        <span className="text-2xl text-secondary">{t('ui.text_d1457b72')}</span>
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-primary">{t('ui.gym_not_found_653cddd8')}</h2>
        <p className="text-secondary max-w-sm mx-auto">
          {t('ui.the_gym_you_are_looking_for_does_not_exist_o_d3211293')}</p>
      </div>
      <Link href={MODULE_URLS.PAGES.MAIN} className="mt-4 px-5 py-2.5 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-subtle motion-safe:transition-colors" data-testid="superadmin_gyms-not-found-back-to-gyms-directory">
        {t('ui.back_to_gyms_directory_39d3c97f')}</Link>
    </div>);
}
