'use client';
/**
 * RESPONSIBILITY: React component SuperadminComplianceDocumentsPanel owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceDocumentsEmptyState, @/components/ui/Tooltip, @/components/ui/Panel, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_constants/SuperadminComplianceStatusBadgeConfig, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance documents panel section.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import { displayValue } from '@/lib/formatters';

import SuperadminComplianceDocumentsEmptyState from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceDocumentsEmptyState';
import { getSuperadminComplianceStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_constants/SuperadminComplianceStatusBadgeConfig';

import type { SuperadminComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_types/SuperadminComplianceTypes';


/**
 * @description Renders the Superadmin compliance documents panel section.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminComplianceDocumentsPanel({ data }: SuperadminComplianceSectionProps) {
  const t = useTranslations('superadmin_compliance');
    return (<Panel title={t('ui.compliance_documents_02396dac')} description={t('ui.tenant_level_registrations_and_expiry_dates_929cfe01')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            {t('ui.tenant_6252d057')}</th>
          <th className="px-3 py-3">
            {t('ui.document_09453598')}</th>
          <th className="px-3 py-3">
            {t('ui.status_ec53a8c4')}</th>
          <th className="px-3 py-3">
            {t('ui.expiry_ad7a5dcc')}</th>
        </tr>
      </thead>
      <tbody>
        {data.documents.length === 0 ? <tr><td colSpan={4}><SuperadminComplianceDocumentsEmptyState /></td></tr> : data.documents.map(d => (<tr key={`${d.tenant}-${d.document}`} className="border-b border-border">
            <td className="px-3 py-3 text-primary">
              <Tooltip content={d.tenant}>
                <span className="max-w-56 truncate">
                  {d.tenant}
                </span>
              </Tooltip>
            </td>
            <td className="px-3 py-3 text-secondary">
              {d.document}
            </td>
            <td className="px-3 py-3">
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminComplianceStatusBadgeClasses(d.status)}`}>
                {d.status}
              </span>
            </td>
            <td className="px-3 py-3 text-secondary">
              {displayValue(d.expires, '—')}
            </td>
          </tr>))}
      </tbody>
    </table>
  </div>
    </Panel>);
}
