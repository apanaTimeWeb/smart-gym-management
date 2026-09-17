// RESPONSIBILITY: Orchestrates the Superadmin plans V1 data view and its focused child sections.
'use client';
import SuperadminPlansV1ComparisonPanel from '@/app/superadmin/plans/plans_components/SuperadminPlansV1ComparisonPanel';
import SuperadminPlansV1HistoryAddonsAndMigrationSection from '@/app/superadmin/plans/plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection';
import { useSuperadminPlansV1 } from '@/app/superadmin/plans/plans_utils/useSuperadminPlansV1';
export default function SuperadminPlansV1Client() {
    // DATA FLOW: API → useSuperadminPlansV1 → focused V1 child views.
    const query = useSuperadminPlansV1();
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
  <SuperadminPlansV1ComparisonPanel data={data}/>
  <SuperadminPlansV1HistoryAddonsAndMigrationSection data={data}/>
    </section>);
}
