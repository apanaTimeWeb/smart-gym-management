// RESPONSIBILITY: Renders tenant data-export requests in the Superadmin offboarding workflow.
'use client';
import { formatDate, displayValue } from '@/lib/formatters';
import SuperadminOffboardingRequestsEmptyState from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingRequestsEmptyState';
import SuperadminTooltip from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminTooltip';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import { getSuperadminStatusBadgeClasses } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminStatusBadgeConfig';
import type { SuperadminOffboardingSectionProps } from '@/app/superadmin/offboarding/offboarding_types/SuperadminOffboardingTypes';
export default function SuperadminOffboardingRequestsPanel({ data }: SuperadminOffboardingSectionProps) {
    return (<SuperadminV1Panel title="Export Requests" description="Review tenant requests for a complete data export before final purge handling.">
      {data.requests.length === 0 ? <SuperadminOffboardingRequestsEmptyState /> : (<div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs uppercase text-secondary">
              <th className="px-3 py-3">Tenant</th><th className="px-3 py-3">Requested By</th><th className="px-3 py-3">Request</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Requested</th>
            </tr></thead>
            <tbody>
              {data.requests.map((request) => (<tr key={`${request.tenant}-${request.requestedAt}-${request.requestType}`} className="border-b border-border">
                  <td className="px-3 py-3"><SuperadminTooltip content={request.tenant}><span className="block max-w-56 truncate font-medium text-foreground">{request.tenant}</span></SuperadminTooltip></td>
                  <td className="px-3 py-3 text-secondary">{request.requestedBy}</td>
                  <td className="px-3 py-3 text-secondary">{request.requestType}</td>
                  <td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminStatusBadgeClasses(request.status)}`}>{request.status}</span></td>
                  <td className="px-3 py-3 text-secondary">{displayValue(request.requestedAt ? formatDate(request.requestedAt) : null, '—')}</td>
                </tr>))}
            </tbody>
          </table>
        </div>)}
    </SuperadminV1Panel>);
}
