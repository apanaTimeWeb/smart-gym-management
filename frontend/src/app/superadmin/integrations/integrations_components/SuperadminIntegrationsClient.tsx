// RESPONSIBILITY: Orchestrates the Superadmin integrations page and its focused child sections.
'use client';
import SuperadminIntegrationsConnectionHealthPanel from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsConnectionHealthPanel';
import SuperadminIntegrationsPageHeader from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsPageHeader';
import SuperadminIntegrationsSummaryCards from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsSummaryCards';
import SuperadminIntegrationsWebhooksAndDeveloperAccessPanel from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsWebhooksAndDeveloperAccessPanel';
import { useSuperadminIntegrationsPage } from '@/app/superadmin/integrations/integrations_utils/useSuperadminIntegrationsPage';
export default function SuperadminIntegrationsClient() {
    // DATA FLOW: API → useSuperadminIntegrationsPage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminIntegrationsPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-danger/30 bg-danger-bg p-5" role="alert">
  <p className="font-semibold text-danger">
    Integrations data could not be loaded.
  </p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
    Retry
  </button>
        </div>);
    }
    return (<div className="space-y-6">
      <SuperadminIntegrationsPageHeader data={data}/>
      <SuperadminIntegrationsSummaryCards data={data}/>
      <SuperadminIntegrationsConnectionHealthPanel data={data}/>
      <SuperadminIntegrationsWebhooksAndDeveloperAccessPanel data={data}/>
    </div>);
}
