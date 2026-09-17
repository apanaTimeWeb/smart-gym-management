// RESPONSIBILITY: Orchestrates the Superadmin analytics V1 data view and its focused child sections.
'use client';
import SuperadminAnalyticsV1AdoptionAndAcquisitionSection from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection';
import SuperadminAnalyticsV1CohortRetentionTable from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsV1CohortRetentionTable';
import SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection';
import SuperadminAnalyticsV1RetentionSummaryCards from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsV1RetentionSummaryCards';
import { useSuperadminAnalyticsV1 } from '@/app/superadmin/analytics/analytics_utils/useSuperadminAnalyticsV1';
export default function SuperadminAnalyticsV1Client() {
    // DATA FLOW: API → useSuperadminAnalyticsV1 → focused V1 child views.
    const query = useSuperadminAnalyticsV1();
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
  <SuperadminAnalyticsV1RetentionSummaryCards data={data}/>
  <SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection data={data}/>
  <SuperadminAnalyticsV1CohortRetentionTable data={data}/>
  <SuperadminAnalyticsV1AdoptionAndAcquisitionSection data={data}/>
    </section>);
}
