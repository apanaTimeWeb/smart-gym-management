// RESPONSIBILITY: Orchestrates the Superadmin global-audit V1 data view and its focused child sections.
'use client';
import SuperadminGlobalAuditV1BeforeAndAfterChangesPanel from '@/app/superadmin/global-audit/global-audit_components/SuperadminGlobalAuditV1BeforeAndAfterChangesPanel';
import SuperadminGlobalAuditV1InvestigationSummaryCards from '@/app/superadmin/global-audit/global-audit_components/SuperadminGlobalAuditV1InvestigationSummaryCards';
import SuperadminGlobalAuditV1SuspiciousActivityPanel from '@/app/superadmin/global-audit/global-audit_components/SuperadminGlobalAuditV1SuspiciousActivityPanel';
import { useSuperadminGlobalAuditV1 } from '@/app/superadmin/global-audit/global-audit_utils/useSuperadminGlobalAuditV1';
export default function SuperadminGlobalAuditV1Client() {
    // DATA FLOW: API → useSuperadminGlobalAuditV1 → focused V1 child views.
    const query = useSuperadminGlobalAuditV1();
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
  <SuperadminGlobalAuditV1InvestigationSummaryCards data={data}/>
  <SuperadminGlobalAuditV1BeforeAndAfterChangesPanel data={data}/>
  <SuperadminGlobalAuditV1SuspiciousActivityPanel data={data}/>
    </section>);
}
