'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamAlertPreferencesEmptyState owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin alert preferences list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


export default function SuperadminTeamAlertPreferencesEmptyState() {
  const t = useTranslations('superadmin_team');
    return <EmptyState title={t('ui.alert_preferences_d2e1855a')} description={t('ui.add_alert_preferences_when_platform_monitori_8ad20266')} data-testid="superadmin_team-superadmin-team-alert-preferences-empty-state-preferences-empty-state-empty"/>;
}
