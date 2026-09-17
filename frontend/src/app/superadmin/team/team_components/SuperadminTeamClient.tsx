// RESPONSIBILITY: Orchestrates the Superadmin team page and its focused child sections.
'use client';
import SuperadminTeamMembersPanel from '@/app/superadmin/team/team_components/SuperadminTeamMembersPanel';
import SuperadminTeamPageHeader from '@/app/superadmin/team/team_components/SuperadminTeamPageHeader';
import SuperadminTeamRolesAndAlertPreferencesPanel from '@/app/superadmin/team/team_components/SuperadminTeamRolesAndAlertPreferencesPanel';
import SuperadminTeamSummaryCards from '@/app/superadmin/team/team_components/SuperadminTeamSummaryCards';
import { useSuperadminTeamPage } from '@/app/superadmin/team/team_utils/useSuperadminTeamPage';
export default function SuperadminTeamClient() {
    // DATA FLOW: API → useSuperadminTeamPage → focused child views.
    const { data, isLoading, isError, refetch } = useSuperadminTeamPage();
    if (isLoading) {
        return (<div className="space-y-4" aria-busy="true">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-danger/30 bg-danger-bg p-5" role="alert">
  <p className="font-semibold text-danger">
    Platform team data could not be loaded.
  </p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
    Retry
  </button>
        </div>);
    }
    return (<div className="space-y-6">
      <SuperadminTeamPageHeader data={data}/>
      <SuperadminTeamSummaryCards data={data}/>
      <SuperadminTeamMembersPanel data={data}/>
      <SuperadminTeamRolesAndAlertPreferencesPanel data={data}/>
    </div>);
}
