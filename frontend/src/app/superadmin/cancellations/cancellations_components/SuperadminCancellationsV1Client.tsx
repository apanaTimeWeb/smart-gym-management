// RESPONSIBILITY: Orchestrates the Superadmin cancellations V1 data view and its focused child sections.
'use client';
import SuperadminCancellationsV1ReasonsAndPlanComparisonSection from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsV1ReasonsAndPlanComparisonSection';
import SuperadminCancellationsV1RecoverySummaryCards from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsV1RecoverySummaryCards';
import { useSuperadminCancellationsV1 } from '@/app/superadmin/cancellations/cancellations_utils/useSuperadminCancellationsV1';
export default function SuperadminCancellationsV1Client() {
    // DATA FLOW: API → useSuperadminCancellationsV1 → focused V1 child views.
    const query = useSuperadminCancellationsV1();
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
  <SuperadminCancellationsV1RecoverySummaryCards data={data}/>
  <SuperadminCancellationsV1ReasonsAndPlanComparisonSection data={data}/>
    </section>);
}
