'use client';
/**
 * RESPONSIBILITY: React component SuperadminWhiteLabelingLoadingState owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the layout-matching loading skeleton for the White-labeling domain list.
import { useTranslations } from 'next-intl';

export default function SuperadminWhiteLabelingLoadingState() {
  const t = useTranslations('superadmin_white_labeling');
  return (
    <div className="space-y-4" aria-busy="true" aria-label={t('ui.loading_custom_domains_f3977843')} data-testid="superadmin_white_labeling-superadmin-white-labeling-loading-state-loading-state-loading-state">
      <div className="h-10 w-48 rounded-md bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-14 w-full rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-64 w-full rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>
  );
}
