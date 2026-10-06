// RESPONSIBILITY: Renders and orchestrates SuperadminWhiteLabelingTable for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminWhiteLabelingTable owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/components/ui/Tooltip, @/lib/formatters, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingComponentTypes, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingStatusBadge, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_store/useSuperadminWhiteLabelingStore, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingEmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders White-labeling domain records as a clickable desktop table and mobile card stack. No API calls.
import { useTranslations } from 'next-intl';

import Tooltip from '@/components/ui/Tooltip';
import { formatDate } from '@/lib/formatters';

import SuperadminWhiteLabelingEmptyState from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingEmptyState';
import SuperadminWhiteLabelingStatusBadge from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingStatusBadge';
import { useSuperadminWhiteLabelingStore } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_store/useSuperadminWhiteLabelingStore';

import type { SuperadminWhiteLabelingTableProps } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingComponentTypes';
import type { WhiteLabelDomain } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';
import type { KeyboardEvent } from 'react';



function openDomain(id: string) { useSuperadminWhiteLabelingStore.getState().setSelectedDomainId(id); }

/**
 * @description Owns the SuperadminWhiteLabelingTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminWhiteLabelingTable({ domains }: SuperadminWhiteLabelingTableProps) {
  const t = useTranslations('superadmin_white_labeling');
  if (domains.length === 0) return <SuperadminWhiteLabelingEmptyState />;

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDomain(id); }
  };

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t('ui.white_labeling_custom_domains_e5d66331')}</caption>
            <thead><tr className="border-b border-border bg-surface-highlight"><th className="w-48 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.gym_name_4ad76c40')}</th><th className="min-w-40 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.domain_eae639a7')}</th><th className="w-28 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.status_ec53a8c4')}</th><th className="w-28 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.ssl_ea52c362')}</th><th className="w-32 p-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.added_on_70e4179a')}</th></tr></thead>
            <tbody className="divide-y divide-border">
              {domains.map((domain) => (
                <tr key={domain.id} tabIndex={0} onClick={() => openDomain(domain.id)} onKeyDown={(event) => handleRowKeyDown(event, domain.id)} className="cursor-pointer motion-safe:transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" data-testid={`superadmin_white_labeling-table-row-${domain.id}`}>
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

      <div className="space-y-3 md:hidden" aria-label={t('ui.white_labeling_custom_domains_e5d66331')}>
        {domains.map((domain) => (
          <button key={domain.id} type="button" onClick={() => openDomain(domain.id)} className="block min-h-11 w-full rounded-xl border border-border bg-card p-4 text-left motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_white_labeling-superadmin-white-labeling-table-white-labeling-table-button">
            <div className="flex items-start justify-between gap-3"><span className="min-w-0 truncate font-semibold text-primary">{domain.gymName}</span><SuperadminWhiteLabelingStatusBadge status={domain.status} /></div>
            <p className="mt-2 truncate font-mono text-sm text-secondary">{domain.domain}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-secondary"><div><span className="block text-disabled">{t('ui.ssl_ea52c362')}</span><SuperadminWhiteLabelingStatusBadge status={domain.sslStatus} /></div><div><span className="block text-disabled">{t('ui.added_f29ddbfb')}</span><span>{formatDate(domain.createdAt)}</span></div></div>
          </button>
        ))}
      </div>
    </>
  );
}
