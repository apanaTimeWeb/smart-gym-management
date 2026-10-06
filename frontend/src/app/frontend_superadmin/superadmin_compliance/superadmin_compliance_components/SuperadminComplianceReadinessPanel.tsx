// RESPONSIBILITY: Renders/orchestrates SuperadminComplianceReadinessPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminComplianceReadinessPanel owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance readiness panel section.
import { FileCheck2, Landmark, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes';


/**
 * @description Renders the Superadmin compliance readiness panel section.
 * @dependencies lucide-react, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminComplianceReadinessPanel({ data }: SuperadminComplianceSectionProps) {
  const t = useTranslations('superadmin_compliance');
    return (<div className="rounded-xl border border-border bg-info-bg p-4">
  <div className="flex gap-3">
    <FileCheck2 size={18} className="mt-0.5 text-info"/>
    <div>
      <p className="font-medium text-primary">
        {t('ui.keep_compliance_records_auditable_c4f616be')}</p>
      <p className="mt-1 text-xs text-secondary">
        {t('ui.tax_configuration_and_registration_data_shou_3fbdbc7f')}</p>
    </div>
    <ShieldCheck size={18} className="ml-auto text-success"/>
  </div>
    </div>);
}
