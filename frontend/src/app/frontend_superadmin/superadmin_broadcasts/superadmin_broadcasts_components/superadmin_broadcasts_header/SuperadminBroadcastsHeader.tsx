'use client';
import { Plus, Search, Megaphone } from 'lucide-react';
/**

 * RESPONSIBILITY: React component SuperadminBroadcastsHeader owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes, lucide-react, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the page title, search input, and "New Broadcast" CTA for the Broadcasts page. Receives all state via props — no API calls.
import { useTranslations } from 'next-intl';

import { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';

import type { BroadcastStatusFilter, SuperadminBroadcastsHeaderProps } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';


/**
 * @description Renders the page title, search input, and "New Broadcast" CTA for the Broadcasts page. Receives all state via props — no API calls.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBroadcastsHeader({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, onCreateClick }: SuperadminBroadcastsHeaderProps) {
  const t = useTranslations('superadmin_broadcasts');
    return (<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Megaphone size={18} className="text-primary"/>
          {t('ui.announcements_broadcasts_f72fd168')}</h1>
        <p className="text-sm text-secondary mt-1">{t('ui.push_notifications_and_announcements_to_all__f1453a1c')}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input type="text" placeholder={t('ui.search_broadcasts_d23d02d2')} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors  w-full sm:w-64 " data-testid="superadmin_broadcasts-superadmin-broadcasts-header-superadmin-broadcasts-header-text"/>
        </div>
        
        {onStatusFilterChange && (<select value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value as BroadcastStatusFilter)} className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" data-testid="superadmin_broadcasts-superadmin-broadcasts-header-superadmin-broadcasts-header-select">
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL} data-testid="superadminbroadcastsheader-option-3882">{t('ui.all_status_162647d9')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.DRAFT} data-testid="superadminbroadcastsheader-option-3953">{t('ui.draft_f03ab16c')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SCHEDULED} data-testid="superadminbroadcastsheader-option-4021">{t('ui.scheduled_2b7dabba')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SENT} data-testid="superadminbroadcastsheader-option-4097">{t('ui.sent_7f8c0283')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.FAILED} data-testid="superadminbroadcastsheader-option-4163">{t('ui.failed_d7c8c85b')}</option>
          </select>)}

        <button onClick={onCreateClick} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-header-broadcasts-header-new-broadcast">
          <Plus size={18}/>
          {t('ui.new_broadcast_10fa2e62')}</button>
      </div>
    </div>);
}
