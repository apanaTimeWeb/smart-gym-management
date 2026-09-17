// RESPONSIBILITY: Orchestrates the Superadmin infrastructure V1 data view and its focused child sections.
'use client';
import SuperadminInfrastructureV1EndpointHealthTable from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable';
import SuperadminInfrastructureV1RecentIncidentsPanel from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel';
import SuperadminInfrastructureV1ServiceHealthSummaryCards from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards';
import { useSuperadminInfrastructureV1 } from '@/app/superadmin/infrastructure/infrastructure_utils/useSuperadminInfrastructureV1';
export default function SuperadminInfrastructureV1Client() {
    // DATA FLOW: API → useSuperadminInfrastructureV1 → focused V1 child views.
    const query = useSuperadminInfrastructureV1();
    if (query.isPending) {
        return (<div className="space-y-4">
  <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
  <div className="h-80 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
  <div className="h-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        </div>);
    }
    if (query.isError || !query.data?.data) {
        return (<div className="rounded-xl border border-danger/30 bg-danger-bg p-5">
  <p className="font-semibold text-danger">
    Business insights could not be loaded.
  </p>
  <button type="button" onClick={() => query.refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
    Retry
  </button>
        </div>);
    }
    const data = query.data.data;
    return (<section className="mt-8 space-y-6">
  <SuperadminInfrastructureV1ServiceHealthSummaryCards data={data}/>
  <SuperadminInfrastructureV1EndpointHealthTable data={data}/>
  <SuperadminInfrastructureV1RecentIncidentsPanel data={data}/>
    </section>);
}
