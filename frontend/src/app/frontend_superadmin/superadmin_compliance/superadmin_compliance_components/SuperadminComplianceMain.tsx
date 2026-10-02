'use client';
/**
 * RESPONSIBILITY: React component SuperadminComplianceMain owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceDocumentsPanel, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminCompliancePageHeader, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceReadinessPanel, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceRegionalCoveragePanel, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceSummaryCards, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_hooks/useSuperadminCompliancePage
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Orchestrates the Superadmin compliance page and its focused child sections.
import { useTranslations } from 'next-intl';

import SuperadminComplianceDocumentsPanel from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceDocumentsPanel';
import SuperadminCompliancePageHeader from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminCompliancePageHeader';
import SuperadminComplianceReadinessPanel from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceReadinessPanel';
import SuperadminComplianceRegionalCoveragePanel from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceRegionalCoveragePanel';
import SuperadminComplianceSummaryCards from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceSummaryCards';
import { useSuperadminCompliancePage } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_hooks/useSuperadminCompliancePage';


/**
 * @description Orchestrates the Superadmin compliance page and its focused child sections.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminComplianceMain() {
  const t = useTranslations('superadmin_compliance');
    // DATA FLOW: API → useSuperadminCompliancePage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminCompliancePage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_compliance-superadmin-compliance-main-page">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert" data-testid="superadmin_compliance-main-error-state">
  <p className="font-semibold text-danger">
    {t('ui.compliance_data_could_not_be_loaded_3c341c06')}</p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95" data-testid="superadmin_compliance-superadmin-compliance-main-superadmin-compliance-main-retry">
    {t('ui.retry_6327b4e5')}</button>
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
