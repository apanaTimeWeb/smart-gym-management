// RESPONSIBILITY: Renders the Superadmin compliance documents panel section.
'use client';
import { displayValue } from '@/lib/formatters';
import SuperadminComplianceDocumentsEmptyState from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceDocumentsEmptyState';
import SuperadminTooltip from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminTooltip';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import { getSuperadminComplianceStatusBadgeClasses } from '@/app/superadmin/compliance/compliance_utils/SuperadminComplianceStatusBadgeConfig';
import type { SuperadminComplianceSectionProps } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
export default function SuperadminComplianceDocumentsPanel({ data }: SuperadminComplianceSectionProps) {
    return (<SuperadminPanel title="Compliance Documents" description="Tenant-level registrations and expiry dates.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Tenant
          </th>
          <th className="px-3 py-3">
            Document
          </th>
          <th className="px-3 py-3">
            Status
          </th>
          <th className="px-3 py-3">
            Expiry
          </th>
        </tr>
      </thead>
      <tbody>
        {data.documents.length === 0 ? <tr><td colSpan={4}><SuperadminComplianceDocumentsEmptyState /></td></tr> : data.documents.map(d => (<tr key={`${d.tenant}-${d.document}`} className="border-b border-border">
            <td className="px-3 py-3 text-primary">
              <SuperadminTooltip content={d.tenant}>
                <span className="max-w-56 truncate">
                  {d.tenant}
                </span>
              </SuperadminTooltip>
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
    </SuperadminPanel>);
}
