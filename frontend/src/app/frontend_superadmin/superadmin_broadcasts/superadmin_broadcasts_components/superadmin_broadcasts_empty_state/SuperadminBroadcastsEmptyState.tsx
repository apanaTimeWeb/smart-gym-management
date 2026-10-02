'use client';
/**
 * RESPONSIBILITY: React component SuperadminBroadcastsEmptyState owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the empty state UI for the Broadcasts table when no broadcasts exist. Shows icon, message, and CTA to create first broadcast.
import { Megaphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminBroadcastsEmptyStateProps } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';


export default function SuperadminBroadcastsEmptyState({ onCreateClick }: SuperadminBroadcastsEmptyStateProps) {
  const t = useTranslations('superadmin_broadcasts');
    return (<div className="flex flex-col items-center justify-center py-16 text-center" data-testid="superadmin_broadcasts-superadmin-broadcasts-empty-state-broadcasts-empty-state-empty">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
        <Megaphone size={18} className="text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">{t('ui.no_broadcasts_yet_2b360f65')}</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">{t('ui.create_your_first_announcement_to_push_notif_d2b9dd7c')}</p>
      <button onClick={onCreateClick} className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_broadcasts-superadmin-broadcasts-empty-state-state-create-first-broadcast">
        {t('ui.create_first_broadcast_7952bbb6')}</button>
    </div>);
}
