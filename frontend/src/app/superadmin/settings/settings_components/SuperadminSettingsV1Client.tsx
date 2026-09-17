// RESPONSIBILITY: Orchestrates the Superadmin settings V1 data view and its focused child sections.
'use client';
import SuperadminSettingsV1BillingControlsPanel from '@/app/superadmin/settings/settings_components/SuperadminSettingsV1BillingControlsPanel';
import SuperadminSettingsV1CommunicationDefaultsPanel from '@/app/superadmin/settings/settings_components/SuperadminSettingsV1CommunicationDefaultsPanel';
import SuperadminSettingsV1DataControlsPanel from '@/app/superadmin/settings/settings_components/SuperadminSettingsV1DataControlsPanel';
import SuperadminSettingsV1SecurityControlsPanel from '@/app/superadmin/settings/settings_components/SuperadminSettingsV1SecurityControlsPanel';
import { useSuperadminSettingsV1 } from '@/app/superadmin/settings/settings_utils/useSuperadminSettingsV1';
export default function SuperadminSettingsV1Client() {
    // DATA FLOW: API → useSuperadminSettingsV1 → focused V1 child views.
    const query = useSuperadminSettingsV1();
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
    return (<section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminSettingsV1BillingControlsPanel data={data}/>
  <SuperadminSettingsV1SecurityControlsPanel data={data}/>
  <SuperadminSettingsV1DataControlsPanel data={data}/>
  <SuperadminSettingsV1CommunicationDefaultsPanel data={data}/>
    </section>);
}
