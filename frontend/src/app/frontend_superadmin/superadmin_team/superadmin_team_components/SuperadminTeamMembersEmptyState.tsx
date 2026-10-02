'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamMembersEmptyState owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin team members list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


export default function SuperadminTeamMembersEmptyState() {
  const t = useTranslations('superadmin_team');
    return <EmptyState title={t('ui.team_members_0b272d2a')} description={t('ui.add_a_named_operator_when_platform_access_is_60fa6171')} data-testid="superadmin_team-superadmin-team-members-empty-state-members-empty-state-empty"/>;
}
