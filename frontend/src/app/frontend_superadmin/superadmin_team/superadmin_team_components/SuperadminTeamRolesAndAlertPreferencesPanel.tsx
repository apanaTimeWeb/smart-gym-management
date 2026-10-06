// RESPONSIBILITY: Renders/orchestrates SuperadminTeamRolesAndAlertPreferencesPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminTeamRolesAndAlertPreferencesPanel owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect, useState
 * MODULE DEPENDENCIES: lucide-react, @/lib/formatters, @/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamAlertPreferencesEmptyState, @/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamRoleGroupsEmptyState, @/components/ui/Panel, @/app/frontend_superadmin/superadmin_team/superadmin_team_hooks/useSuperadminTeamAlertPreferences, @/app/frontend_superadmin/superadmin_team/superadmin_team_types/SuperadminTeamTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders Superadmin roles and editable alert preferences; mutation orchestration stays inside this feature panel.
import { useEffect, useState } from 'react';

import { Bell, Loader2, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import Panel from '@/components/ui/Panel';
import { formatNumber } from '@/lib/formatters';

import SuperadminTeamAlertPreferencesEmptyState from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamAlertPreferencesEmptyState';
import SuperadminTeamRoleGroupsEmptyState from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamRoleGroupsEmptyState';
import { useSuperadminTeamAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_hooks/useSuperadminTeamAlertPreferences';

import type { SuperadminTeamSectionProps } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_types/SuperadminTeamTypes';


/**
 * @description Owns the SuperadminTeamRolesAndAlertPreferencesPanel responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamRolesAndAlertPreferencesPanel({ data }: SuperadminTeamSectionProps) {
  const t = useTranslations('superadmin_team');
    const { savePreferences: persistPreferences, isSaving: saving, error: saveError } = useSuperadminTeamAlertPreferences(); const [draft,setDraft]=useState<Record<string,boolean>>({});
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(()=>setDraft(Object.fromEntries(data.alerts.map(alert=>[alert.name,alert.enabled]))),[data.alerts]);
    const handleSave=async()=>{try{const preferences=data.alerts.map(alert=>({name:alert.name,enabled:draft[alert.name] ?? alert.enabled}));const response=await persistPreferences(preferences);toast.success(response.message,{id:'superadmin-team-alert-preferences-saved'});}catch(error:unknown){toast.error(error instanceof Error?error.message:'Unable to save alert preferences.',{id:'superadmin-team-alert-preferences-error'});}};
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2"><Panel title={t('ui.role_groups_02a76b89')} description={t('ui.keep_platform_permissions_separated_by_job_r_0c8af13c')}><div className="space-y-3">{data.roles.length===0?<SuperadminTeamRoleGroupsEmptyState/>:data.roles.map(role=><div key={role.name} className="flex items-center justify-between rounded-lg border border-border bg-input p-3"><div><p className="font-medium text-primary">{role.name}</p><p className="text-xs text-secondary">{role.scope}</p></div><span className="text-sm text-primary">{formatNumber(role.permissions)} {t('ui.permissions_41275a53')}</span></div>)}</div></Panel><Panel title={t('ui.my_alert_preferences_a765856f')} description={t('ui.choose_which_platform_alerts_the_current_ope_fa28563e')}><div className="space-y-3">{data.alerts.length===0?<SuperadminTeamAlertPreferencesEmptyState/>:data.alerts.map(alert=><label key={alert.name} className="flex items-center gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={draft[alert.name] ?? alert.enabled} onChange={(event)=>setDraft(prev=>({...prev,[alert.name]:event.target.checked}))} className="size-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox"/><Bell size={18} className="text-secondary"/><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-primary">{alert.name}</span><span className="block truncate text-xs text-secondary">{alert.channel} {t('ui.text_176848af')}{alert.threshold}</span></span></label>)}</div><button type="button" disabled={saving} onClick={handleSave} className="mt-4 inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-button"><Save size={18}/>{saving?<><Loader2 size={18} className="motion-safe:animate-spin"/>{t('ui.saving_575f5f86')}</>:'Save Preferences'}</button></Panel></div>;
}
