'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamSummaryCards owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters, @/components/ui/MetricCard, @/app/frontend_superadmin/superadmin_team/superadmin_team_types/SuperadminTeamTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin team summary cards section.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatDateTime, formatNumber } from '@/lib/formatters';

import { SUPERADMIN_TEAM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_constants/SuperadminTeamStatusBadgeConfig';

import type { SuperadminTeamSectionProps } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_types/SuperadminTeamTypes';


export default function SuperadminTeamSummaryCards({ data }: SuperadminTeamSectionProps) {
  const t = useTranslations('superadmin_team');
    const active = data.users.filter(u => u.status === SUPERADMIN_TEAM_STATUS_CODES.ACTIVE).length;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <MetricCard label={t('ui.team_members_8196446d')} value={formatNumber(data.users.length)} helper={t('ui.platform_operators_97a8ff63')} data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-1"/>
  <MetricCard label={t('ui.active_access_7e4b57f7')} value={formatNumber(active)} helper={t('ui.enabled_accounts_9c0f5fda')} tone="success" data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-2"/>
  <MetricCard label={t('ui.role_groups_02a76b89')} value={formatNumber(data.roles.length)} helper={t('ui.defined_scopes_a2627074')} tone="info" data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-3"/>
  <MetricCard label={t('ui.alerts_on_c47046a0')} value={formatNumber(data.alerts.filter((item) => item.enabled).length)} helper={t('ui.current_alerts_2fe5defc')} tone="warning" data-testid="superadmin-team-superadmin-team-summary-cards-metric-card-4"/>
    </div>);
}
