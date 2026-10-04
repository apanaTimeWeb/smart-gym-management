// RESPONSIBILITY: Renders/orchestrates SuperadminWhiteLabelingStatusBadge within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminWhiteLabelingStatusBadge owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingComponentTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the semantic White-labeling domain and SSL status badge without owning business state.
import { BadgeCheck, Clock, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminWhiteLabelingStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingComponentTypes';



/**
 * @description Renders WhiteLabelingStatusBadge within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminWhiteLabelingStatusBadge({ status }: SuperadminWhiteLabelingStatusBadgeProps) {
  const t = useTranslations('superadmin_white_labeling');
  if (status === 'active' || status === 'issued') {
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success" data-testid="superadmin_white_labeling-superadmin-white-labeling-status-badge-labeling-status-badge-status"><BadgeCheck size={18} aria-hidden="true" data-testid="superadmin_white_labeling-whitelabelingstatusbadge-state"/>{status === 'issued' ? t('ui.issued_5d7a1c3e') : t('ui.active_8b4e3d3')}</span>;
  }
  if (status === 'pending') {
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-2.5 py-1 text-xs font-medium text-warning"><Clock size={18} aria-hidden="true"/>{t('ui.pending_2d13df6f')}</span>;
  }
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-xs font-medium text-danger"><XCircle size={18} aria-hidden="true"/>{t('ui.failed_d7c8c85b')}</span>;
}
