// RESPONSIBILITY: Orchestrates the Superadmin features V1 data view and its focused child sections.
'use client';
import SuperadminFeaturesV1ReleaseAndRollbackSection from '@/app/superadmin/features/features_components/SuperadminFeaturesV1ReleaseAndRollbackSection';
import SuperadminFeaturesV1RolloutControlPanel from '@/app/superadmin/features/features_components/SuperadminFeaturesV1RolloutControlPanel';
import { useSuperadminFeaturesV1 } from '@/app/superadmin/features/features_utils/useSuperadminFeaturesV1';
export default function SuperadminFeaturesV1Client() {
    // DATA FLOW: API → useSuperadminFeaturesV1 → focused V1 child views.
    const query = useSuperadminFeaturesV1();
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
  <SuperadminFeaturesV1RolloutControlPanel data={data}/>
  <SuperadminFeaturesV1ReleaseAndRollbackSection data={data}/>
    </section>);
}
