// RESPONSIBILITY: Orchestrates the Superadmin offboarding page and its focused child sections.
'use client';
import SuperadminOffboardingPageHeader from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingPageHeader';
import SuperadminOffboardingPolicyAndSafetyPanel from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingPolicyAndSafetyPanel';
import SuperadminOffboardingQueuePanel from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingQueuePanel';
import SuperadminOffboardingRequestsPanel from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingRequestsPanel';
import SuperadminOffboardingSummaryCards from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingSummaryCards';
import { useSuperadminOffboardingPage } from '@/app/superadmin/offboarding/offboarding_utils/useSuperadminOffboardingPage';
export default function SuperadminOffboardingClient() {
    // DATA FLOW: API → useSuperadminOffboardingPage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminOffboardingPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-danger/30 bg-danger-bg p-5" role="alert">
  <p className="font-semibold text-danger">
    Offboarding data could not be loaded.
  </p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
    Retry
  </button>
        </div>);
    }
    return (<div className="space-y-6">
      <SuperadminOffboardingPageHeader data={data}/>
      <SuperadminOffboardingSummaryCards data={data}/>
      <SuperadminOffboardingQueuePanel data={data}/>
      <SuperadminOffboardingPolicyAndSafetyPanel data={data}/>
      <SuperadminOffboardingRequestsPanel data={data}/>
    </div>);
}
