import { http, HttpResponse } from 'msw';
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_mocks/superadmin_team_mocks_fixtures/SuperadminTeamMockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminTeamMockHandlers owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_team/superadmin_team_url_config, @/app/frontend_superadmin/superadmin_team/superadmin_team_mocks/superadmin_team_mocks_fixtures/SuperadminTeamMockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns mutable MSW behavior for Superadmin team and alert preferences.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_url_config';


let mockTeam = structuredClone(SUPERADMIN_TEAM_MOCK_FIXTURE);

export function resetSuperadminTeamMockState(): void {
  mockTeam = structuredClone(SUPERADMIN_TEAM_MOCK_FIXTURE);
}
export const superadminTeamHandlers = [
    http.get('*' + MODULE_URLS.BACKEND_API.BASE, () => HttpResponse.json({ success:true, message:'Superadmin team data loaded.', data:mockTeam })),
    http.patch(MODULE_URLS.BACKEND_API.ALERT_PREFERENCES, async ({ request }) => { const body = await request.json() as { preferences?: Array<{ name:string; enabled:boolean }> }; const updates = body.preferences ?? []; mockTeam = { ...mockTeam, alerts: mockTeam.alerts.map(alert => { const update=updates.find(item=>item.name===alert.name); return update ? { ...alert, enabled:update.enabled } : alert; }) }; return HttpResponse.json({ success:true, message:'Alert preferences updated.', data:null }); }),
];
