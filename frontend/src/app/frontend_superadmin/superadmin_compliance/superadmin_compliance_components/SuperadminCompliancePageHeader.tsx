'use client';
/**
 * RESPONSIBILITY: React component SuperadminCompliancePageHeader owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance page header section.
import { useTranslations } from 'next-intl';

import type { SuperadminComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes';


/**
 * @description Renders the Superadmin compliance page header section.
 * @dependencies @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * @state No React/client state primitive detected.
 * @edge-cases Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCompliancePageHeader({ data }: SuperadminComplianceSectionProps) {
  const t = useTranslations('superadmin_compliance');
    return (<div>
  <h1 className="text-2xl font-bold text-primary">
    {t('ui.tax_compliance_541ea2ab')}</h1>
  <p className="mt-1 text-sm text-secondary">
    {t('ui.registration_coverage_tax_configuration_and__734eabe4')}</p>
    </div>);
}
