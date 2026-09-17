// RESPONSIBILITY: Orchestrates the Superadmin backups V1 data view and its focused child sections.
'use client';
import SuperadminBackupsV1GymHealthTable from '@/app/superadmin/backups/backups_components/SuperadminBackupsV1GymHealthTable';
import SuperadminBackupsV1HealthSummaryCards from '@/app/superadmin/backups/backups_components/SuperadminBackupsV1HealthSummaryCards';
import SuperadminBackupsV1RestoreTestHistoryPanel from '@/app/superadmin/backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel';
import { useSuperadminBackupsV1 } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsV1';
export default function SuperadminBackupsV1Client() {
    // DATA FLOW: API → useSuperadminBackupsV1 → focused V1 child views.
    const query = useSuperadminBackupsV1();
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
  <SuperadminBackupsV1HealthSummaryCards data={data}/>
  <SuperadminBackupsV1GymHealthTable data={data}/>
  <SuperadminBackupsV1RestoreTestHistoryPanel data={data}/>
    </section>);
}
