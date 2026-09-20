// RESPONSIBILITY: Orchestrates the Superadmin compliance page and its focused child sections.
'use client';
import SuperadminComplianceDocumentsPanel from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceDocumentsPanel';
import SuperadminCompliancePageHeader from '@/app/superadmin/compliance/compliance_components/SuperadminCompliancePageHeader';
import SuperadminComplianceReadinessPanel from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceReadinessPanel';
import SuperadminComplianceRegionalCoveragePanel from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceRegionalCoveragePanel';
import SuperadminComplianceSummaryCards from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceSummaryCards';
import { useSuperadminCompliancePage } from '@/app/superadmin/compliance/compliance_utils/useSuperadminCompliancePage';
export default function SuperadminComplianceClient() {
    // DATA FLOW: API → useSuperadminCompliancePage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminCompliancePage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert">
  <p className="font-semibold text-danger">
    Compliance data could not be loaded.
  </p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
    Retry
  </button>
        </div>);
    }
    return (<div className="space-y-6">
      <SuperadminCompliancePageHeader data={data}/>
      <SuperadminComplianceSummaryCards data={data}/>
      <SuperadminComplianceRegionalCoveragePanel data={data}/>
      <SuperadminComplianceDocumentsPanel data={data}/>
      <SuperadminComplianceReadinessPanel data={data}/>
    </div>);
}
