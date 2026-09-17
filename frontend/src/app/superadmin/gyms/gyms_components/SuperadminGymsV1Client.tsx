// RESPONSIBILITY: Orchestrates the Superadmin gyms V1 data view and its focused child sections.
'use client';
import SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection from '@/app/superadmin/gyms/gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection';
import SuperadminGymsV1TenantComparisonPanel from '@/app/superadmin/gyms/gyms_components/SuperadminGymsV1TenantComparisonPanel';
import { useSuperadminGymsV1 } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymsV1';
export default function SuperadminGymsV1Client() {
    // DATA FLOW: API → useSuperadminGymsV1 → focused V1 child views.
    const query = useSuperadminGymsV1();
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
  <SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection data={data}/>
  <SuperadminGymsV1TenantComparisonPanel data={data}/>
    </section>);
}
