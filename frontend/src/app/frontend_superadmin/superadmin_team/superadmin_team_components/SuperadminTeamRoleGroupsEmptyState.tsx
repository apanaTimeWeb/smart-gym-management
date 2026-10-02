'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamRoleGroupsEmptyState owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin role groups list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


export default function SuperadminTeamRoleGroupsEmptyState() {
  const t = useTranslations('superadmin_team');
    return <EmptyState title={t('ui.role_groups_0200f8b7')} description={t('ui.create_role_groups_before_assigning_platform_c47f59a1')} data-testid="superadmin_team-superadmin-team-role-groups-empty-state-groups-empty-state-empty"/>;
}
