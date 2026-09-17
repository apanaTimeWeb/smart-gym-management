// RESPONSIBILITY: Orchestrates the Superadmin invoices V1 data view and its focused child sections.
'use client';
import SuperadminInvoicesV1PaymentRecoveryQueuePanel from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel';
import SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection';
import SuperadminInvoicesV1RecoverySummaryCards from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesV1RecoverySummaryCards';
import { useSuperadminInvoicesV1 } from '@/app/superadmin/invoices/invoices_utils/useSuperadminInvoicesV1';
export default function SuperadminInvoicesV1Client() {
    // DATA FLOW: API → useSuperadminInvoicesV1 → focused V1 child views.
    const query = useSuperadminInvoicesV1();
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
  <SuperadminInvoicesV1RecoverySummaryCards data={data}/>
  <SuperadminInvoicesV1PaymentRecoveryQueuePanel data={data}/>
  <SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection data={data}/>
    </section>);
}
