// RESPONSIBILITY: Orchestrates the Superadmin tickets V1 data view and its focused child sections.
'use client';
import SuperadminTicketsV1OperatorWorkloadAndBacklogSection from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection';
import SuperadminTicketsV1SupportCategoriesPanel from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsV1SupportCategoriesPanel';
import SuperadminTicketsV1SupportSummaryCards from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsV1SupportSummaryCards';
import { useSuperadminTicketsV1 } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTicketsV1';
export default function SuperadminTicketsV1Client() {
    // DATA FLOW: API → useSuperadminTicketsV1 → focused V1 child views.
    const query = useSuperadminTicketsV1();
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
  <SuperadminTicketsV1SupportSummaryCards data={data}/>
  <SuperadminTicketsV1OperatorWorkloadAndBacklogSection data={data}/>
  <SuperadminTicketsV1SupportCategoriesPanel data={data}/>
    </section>);
}
