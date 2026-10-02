'use client';// RESPONSIBILITY: Orchestrates the Superadmin integrations page and its focused child sections.
import { useTranslations } from 'next-intl';

import SuperadminIntegrationsConnectionHealthPanel from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsConnectionHealthPanel';
import SuperadminIntegrationsPageHeader from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsPageHeader';
import SuperadminIntegrationsSummaryCards from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsSummaryCards';
import SuperadminIntegrationsWebhooksAndDeveloperAccessPanel from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsWebhooksAndDeveloperAccessPanel';
import { useSuperadminIntegrationsPage } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsPage';



/**
 * @description Orchestrates the Superadmin integrations page and its focused child sections.
 * @dependencies API → useSuperadminIntegrationsPage → focused child views.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminIntegrationsMain() {
  const t = useTranslations('superadmin_integrations');
    // DATA FLOW: API → useSuperadminIntegrationsPage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminIntegrationsPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_integrations-superadmin-integrations-main-page">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert" data-testid="superadmin_integrations-superadmin-integrations-main-integrations-integrations-client-alert">
  <p className="font-semibold text-danger">
    
    {t('ui.integrations_data_could_not_be_loaded_4722b09')}
  </p>
  <button  type="button" onClick={() => refetch()} className="min-h-11 mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95" data-testid="superadmin_integrations-superadmin-integrations-main-integrations-integrations-client-retry">
    
    {t('ui.retry_7edc170')}
  </button>
        </div>);
    }
    return (<div className="space-y-6" data-testid="superadmin_integrations-superadmin-integrations-main-page-ready">
      <SuperadminIntegrationsPageHeader data={data}/>
      <SuperadminIntegrationsSummaryCards data={data}/>
      <SuperadminIntegrationsConnectionHealthPanel data={data}/>
      <SuperadminIntegrationsWebhooksAndDeveloperAccessPanel data={data}/>
    </div>);
}
