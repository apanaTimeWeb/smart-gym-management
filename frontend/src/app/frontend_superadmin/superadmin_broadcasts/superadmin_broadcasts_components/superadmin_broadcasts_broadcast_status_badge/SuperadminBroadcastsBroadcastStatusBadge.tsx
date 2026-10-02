'use client';
/**
 * RESPONSIBILITY: React component SuperadminBroadcastsBroadcastStatusBadge owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the status badge pill for a single broadcast. Purely presentational — maps BroadcastStatus to design system colors.
import { useTranslations } from 'next-intl';

import { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';

import type { SuperadminBroadcastStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';


export default function SuperadminBroadcastsBroadcastStatusBadge({ status }: SuperadminBroadcastStatusBadgeProps) {
  const t = useTranslations('superadmin_broadcasts');
    switch (status) {
        case SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SENT:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-status-badge-broadcast-status-badge-status">{t('ui.sent_145d6301')}</span>;
        case SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SCHEDULED:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning">{t('ui.scheduled_1ebf150f')}</span>;
        case SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.DRAFT:
        default:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">{t('ui.draft_52101904')}</span>;
    }
}
