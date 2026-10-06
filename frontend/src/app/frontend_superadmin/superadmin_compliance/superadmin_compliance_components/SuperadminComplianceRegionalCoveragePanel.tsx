// RESPONSIBILITY: Renders/orchestrates SuperadminComplianceRegionalCoveragePanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminComplianceRegionalCoveragePanel owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/lib/formatters, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceRegionalCoverageEmptyState, @/components/ui/Panel, @/components/ui/ProgressBar, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_constants/SuperadminComplianceStatusBadgeConfig, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance regional coverage panel section.
import { Landmark } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatNumber } from '@/lib/formatters';

import SuperadminComplianceRegionalCoverageEmptyState from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceRegionalCoverageEmptyState';
import { getSuperadminComplianceStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_constants/SuperadminComplianceStatusBadgeConfig';

import type { SuperadminComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes';


/**
 * @description Owns the SuperadminComplianceRegionalCoveragePanel responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminComplianceRegionalCoveragePanel({ data }: SuperadminComplianceSectionProps) {
  const t = useTranslations('superadmin_compliance');
    return (<Panel title={t('ui.regional_coverage_5acf0835')} description={t('ui.compare_tax_registration_completeness_by_reg_511a72cd')}>
  <div className="space-y-4">
    {data.regions.length === 0 ? <SuperadminComplianceRegionalCoverageEmptyState /> : data.regions.map(r => (<div key={r.region} className="rounded-lg border border-border p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Landmark size={18} className="text-primary"/>
            <span className="font-medium text-primary">
              {r.region}
            </span>
          </div>
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminComplianceStatusBadgeClasses(r.status)}`}>
            {r.status}
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={r.registered + r.missing > 0 ? Math.round((r.registered / (r.registered + r.missing)) * 100) : 0} label={`${formatNumber(r.registered)} registered / ${formatNumber(r.missing)} missing`} data-testid="superadmin-compliance-superadmin-compliance-regional-coverage-panel-progress-bar-1"/>
        </div>
        <p className="mt-2 text-xs text-secondary">
          {t('ui.configured_tax_rate_01aa5937')}{formatNumber(r.taxRate)}
          {t('ui.text_0bcef9c4')}</p>
      </div>))}
  </div>
    </Panel>);
}
