import { SuperadminTeamAlertPreferencesUpdateResponseSchema, SuperadminTeamResponseSchema } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_schemas/SuperadminTeamContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { SUPERADMIN_TEAM_API } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_url_config';

import type { SuperadminTeamResponse, SuperadminTeamAlertPreferenceUpdate } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_types/SuperadminTeamTypes';
import type { ApiResponse } from '@/lib/api';


export async function fetchTeam(): Promise<ApiResponse<SuperadminTeamResponse>> {
    return apiFetch<ApiResponse<SuperadminTeamResponse>>(SUPERADMIN_TEAM_API.BASE, { dataSchema: SuperadminTeamResponseSchema });
}
export async function updateTeamAlertPreferences(preferences: SuperadminTeamAlertPreferenceUpdate[], idempotencyKey: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(SUPERADMIN_TEAM_API.ALERT_PREFERENCES, { method: 'PATCH', body: JSON.stringify({ preferences }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminTeamAlertPreferencesUpdateResponseSchema.shape.data });
}
