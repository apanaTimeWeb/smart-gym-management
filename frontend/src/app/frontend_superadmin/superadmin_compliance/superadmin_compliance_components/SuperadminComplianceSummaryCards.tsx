// RESPONSIBILITY: Renders/orchestrates SuperadminComplianceSummaryCards within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminComplianceSummaryCards owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters, @/components/ui/MetricCard, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance summary cards section.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatNumber } from '@/lib/formatters';

import type { SuperadminComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes';


/**
 * @description Renders ComplianceSummaryCards within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminComplianceSummaryCards({ data }: SuperadminComplianceSectionProps) {
  const t = useTranslations('superadmin_compliance');
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <MetricCard label={t('ui.tax_details_ready_72652aec')} value={formatNumber(data.summary.registeredTenants)} helper={t('ui.registered_tenants_90a68246')} tone="success" data-testid="superadmin-compliance-superadmin-compliance-summary-cards-metric-card-1"/>
  <MetricCard label={t('ui.missing_tax_details_9a1779f3')} value={formatNumber(data.summary.missingTaxDetails)} helper={t('ui.need_review_16dc4e12')} tone="warning" data-testid="superadmin-compliance-superadmin-compliance-summary-cards-metric-card-2"/>
  <MetricCard label={t('ui.documents_expiring_17fbd246')} value={formatNumber(data.summary.documentsExpiring)} helper={t('ui.near_term_renewals_7804ac74')} tone="warning" data-testid="superadmin-compliance-superadmin-compliance-summary-cards-metric-card-3"/>
  <MetricCard label={t('ui.open_tasks_69190445')} value={formatNumber(data.summary.openComplianceTasks)} helper={t('ui.compliance_work_dc69d074')} tone="danger" data-testid="superadmin-compliance-superadmin-compliance-summary-cards-metric-card-4"/>
    </div>);
}
