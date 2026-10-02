'use client';// RESPONSIBILITY: Renders the not-found component and its associated UI logic.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config';


export default function ReportsNotFound() {
  const t = useTranslations('superadmin_reports');
    return (<div className="empty-state-container" data-testid="superadmin_reports-not-found-not-found-not-found">
      <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center">
        <span className="text-3xl font-bold text-secondary">{t('ui.404_4f4adcbf')}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary mb-1">{t('ui.report_not_found_1d333377')}</h2>
        <p className="text-secondary text-sm max-w-sm">
          {t('ui.the_report_you_are_looking_for_does_not_exis_45ea51ee')}</p>
      </div>
      <Link href={MODULE_URLS.PAGES.MAIN} className="px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-not-found-found-back-to-dashboard">
        {t('ui.back_to_dashboard_3649f1cc')}</Link>
    </div>);
}
