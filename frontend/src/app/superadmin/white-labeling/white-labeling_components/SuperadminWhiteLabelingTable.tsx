// RESPONSIBILITY: Renders White-labeling domain records as a clickable desktop table and mobile card stack. No API calls.
'use client';

import type { KeyboardEvent } from 'react';
import Tooltip from '@/components/ui/Tooltip';
import { formatDate } from '@/lib/formatters';
import type { WhiteLabelDomain } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingTypes';
import type { SuperadminWhiteLabelingTableProps } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingComponentTypes';
import SuperadminWhiteLabelingStatusBadge from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingStatusBadge';
import { useSuperadminWhiteLabelingStore } from '@/app/superadmin/white-labeling/white-labeling_store/useSuperadminWhiteLabelingStore';
import SuperadminWhiteLabelingEmptyState from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingEmptyState';

function openDomain(id: string) { useSuperadminWhiteLabelingStore.getState().setSelectedDomainId(id); }

export default function SuperadminWhiteLabelingTable({ domains }: SuperadminWhiteLabelingTableProps) {
  if (domains.length === 0) return <SuperadminWhiteLabelingEmptyState />;

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDomain(id); }
  };

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">White-labeling custom domains</caption>
            <thead><tr className="border-b border-border bg-surface-highlight"><th className="w-48 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Gym Name</th><th className="min-w-40 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Domain</th><th className="w-28 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Status</th><th className="w-28 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">SSL</th><th className="w-32 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Added On</th></tr></thead>
            <tbody className="divide-y divide-border">
              {domains.map((domain) => (
                <tr key={domain.id} tabIndex={0} onClick={() => openDomain(domain.id)} onKeyDown={(event) => handleRowKeyDown(event, domain.id)} className="cursor-pointer motion-safe:transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                  <td className="max-w-48 p-4"><Tooltip content={domain.gymName}><span className="block truncate font-medium text-primary">{domain.gymName}</span></Tooltip></td>
                  <td className="p-4"><Tooltip content={domain.domain}><span className="block max-w-60 truncate font-mono text-sm text-primary">{domain.domain}</span></Tooltip></td>
                  <td className="p-4"><SuperadminWhiteLabelingStatusBadge status={domain.status} /></td>
                  <td className="p-4"><SuperadminWhiteLabelingStatusBadge status={domain.sslStatus} /></td>
                  <td className="p-4 text-sm text-secondary">{formatDate(domain.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden" aria-label="White-labeling custom domains">
        {domains.map((domain) => (
          <button key={domain.id} type="button" onClick={() => openDomain(domain.id)} className="block min-h-11 w-full rounded-xl border border-border bg-card p-4 text-left motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            <div className="flex items-start justify-between gap-3"><span className="min-w-0 truncate font-semibold text-primary">{domain.gymName}</span><SuperadminWhiteLabelingStatusBadge status={domain.status} /></div>
            <p className="mt-2 truncate font-mono text-sm text-secondary">{domain.domain}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-secondary"><div><span className="block text-disabled">SSL</span><SuperadminWhiteLabelingStatusBadge status={domain.sslStatus} /></div><div><span className="block text-disabled">Added</span><span>{formatDate(domain.createdAt)}</span></div></div>
          </button>
        ))}
      </div>
    </>
  );
}
