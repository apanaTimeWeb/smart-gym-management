// RESPONSIBILITY: Provides API access for Superadmin team data and alert-preference mutations; no fake production fallback.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminTeamUrlConfig } from '@/app/superadmin/team/superadmin_team_url_config';
import { SuperadminTeamResponseSchema, SuperadminTeamAlertPreferencesUpdateResponseSchema } from '@/app/superadmin/team/team_types/SuperadminTeamTypes';
import type { SuperadminTeamResponse, SuperadminTeamAlertPreferenceUpdate } from '@/app/superadmin/team/team_types/SuperadminTeamTypes';
export async function fetchTeam(): Promise<ApiResponse<SuperadminTeamResponse>> {
    return apiFetch<ApiResponse<SuperadminTeamResponse>>(SuperadminTeamUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminTeamResponseSchema });
}
export async function updateTeamAlertPreferences(preferences: SuperadminTeamAlertPreferenceUpdate[], idempotencyKey?: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(SuperadminTeamUrlConfig.BACKEND_API.ALERT_PREFERENCES, { method: 'PATCH', body: JSON.stringify({ preferences }), headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: SuperadminTeamAlertPreferencesUpdateResponseSchema.shape.data });
}
