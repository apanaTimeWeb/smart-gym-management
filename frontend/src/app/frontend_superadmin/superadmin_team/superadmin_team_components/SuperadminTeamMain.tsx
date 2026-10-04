// RESPONSIBILITY: Renders/orchestrates SuperadminTeamMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamMain owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamMembersPanel, @/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamPageHeader, @/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamRolesAndAlertPreferencesPanel, @/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamSummaryCards, @/app/frontend_superadmin/superadmin_team/superadmin_team_hooks/useSuperadminTeamPage
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Orchestrates the Superadmin team page and its focused child sections.
import { useTranslations } from 'next-intl';

import SuperadminTeamMembersPanel from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamMembersPanel';
import SuperadminTeamPageHeader from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamPageHeader';
import SuperadminTeamRolesAndAlertPreferencesPanel from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamRolesAndAlertPreferencesPanel';
import SuperadminTeamSummaryCards from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamSummaryCards';
import { useSuperadminTeamPage } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_hooks/useSuperadminTeamPage';


/**
 * @description Orchestrates the Superadmin team page and its focused child sections.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamMain() {
  const t = useTranslations('superadmin_team');
    // DATA FLOW: API → useSuperadminTeamPage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminTeamPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_team-superadmin-team-main-page">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert" data-testid="superadmin_team-main-error-state">
  <p className="font-semibold text-danger">
    {t('ui.platform_team_data_could_not_be_loaded_3e52e50b')}</p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95" data-testid="superadmin_team-superadmin-team-main-superadmin-team-main-retry">
    {t('ui.retry_6327b4e5')}</button>
        </div>);
    }
    return (<div className="space-y-6" data-testid="superadmin_team-superadmin-team-main-page-ready">
      <SuperadminTeamPageHeader data={data}/>
      <SuperadminTeamSummaryCards data={data}/>
      <SuperadminTeamMembersPanel data={data}/>
      <SuperadminTeamRolesAndAlertPreferencesPanel data={data}/>
    </div>);
}
