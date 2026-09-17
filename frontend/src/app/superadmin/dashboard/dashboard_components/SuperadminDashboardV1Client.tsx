// RESPONSIBILITY: Orchestrates the Superadmin dashboard V1 data view and its focused child sections.
'use client';
import SuperadminDashboardV1BusinessOverviewHeader from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardV1BusinessOverviewHeader';
import SuperadminDashboardV1IncomeGymsAndAlertsSection from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection';
import SuperadminDashboardV1RetentionSummaryCards from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardV1RetentionSummaryCards';
import { useSuperadminDashboardV1 } from '@/app/superadmin/dashboard/dashboard_utils/useSuperadminDashboardV1';
export default function SuperadminDashboardV1Client() {
    // DATA FLOW: API → useSuperadminDashboardV1 → focused V1 child views.
    const query = useSuperadminDashboardV1();
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
  <SuperadminDashboardV1BusinessOverviewHeader data={data}/>
  <SuperadminDashboardV1RetentionSummaryCards data={data}/>
  <SuperadminDashboardV1IncomeGymsAndAlertsSection data={data}/>
    </section>);
}
