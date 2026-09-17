// RESPONSIBILITY: Owns mutable MSW behavior for Superadmin team and alert preferences.
import { http, HttpResponse } from 'msw';
import { SuperadminTeamUrlConfig } from '@/app/superadmin/team/superadmin_team_url_config';
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/superadmin/team/team_mocks/fixtures/SuperadminTeamMockFixtures';
let mockTeam = structuredClone(SUPERADMIN_TEAM_MOCK_FIXTURE);
export const superadminTeamHandlers = [
    http.get('*' + SuperadminTeamUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success:true, message:'Superadmin team data loaded.', data:mockTeam })),
    http.patch(SuperadminTeamUrlConfig.BACKEND_API.ALERT_PREFERENCES, async ({ request }) => { const body = await request.json() as { preferences?: Array<{ name:string; enabled:boolean }> }; const updates = body.preferences ?? []; mockTeam = { ...mockTeam, alerts: mockTeam.alerts.map(alert => { const update=updates.find(item=>item.name===alert.name); return update ? { ...alert, enabled:update.enabled } : alert; }) }; return HttpResponse.json({ success:true, message:'Alert preferences updated.', data:null }); }),
];
