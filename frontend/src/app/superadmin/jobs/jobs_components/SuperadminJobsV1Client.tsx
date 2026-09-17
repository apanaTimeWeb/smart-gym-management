// RESPONSIBILITY: Orchestrates the Superadmin jobs V1 data view and its focused child sections.
'use client';
import SuperadminJobsV1QueueHealthTable from '@/app/superadmin/jobs/jobs_components/SuperadminJobsV1QueueHealthTable';
import SuperadminJobsV1QueueSummaryCards from '@/app/superadmin/jobs/jobs_components/SuperadminJobsV1QueueSummaryCards';
import SuperadminJobsV1RecentFailuresPanel from '@/app/superadmin/jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel';
import { useSuperadminJobsV1 } from '@/app/superadmin/jobs/jobs_utils/useSuperadminJobsV1';
export default function SuperadminJobsV1Client() {
    // DATA FLOW: API → useSuperadminJobsV1 → focused V1 child views.
    const query = useSuperadminJobsV1();
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
  <SuperadminJobsV1QueueSummaryCards data={data}/>
  <SuperadminJobsV1QueueHealthTable data={data}/>
  <SuperadminJobsV1RecentFailuresPanel data={data}/>
    </section>);
}
