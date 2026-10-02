/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSettingsMockHandlers owned by the superadmin_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_fixtures/SuperadminSettingsMockData
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { http, HttpResponse, delay } from 'msw';

import { MOCK_PLATFORM_SETTINGS } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_fixtures/SuperadminSettingsMockData';


const BASE_URL = '*/superadmin/superadmin_settings';
let mockSettings = [...MOCK_PLATFORM_SETTINGS];

export function resetSuperadminSettingsMockState(): void {
  mockSettings = [...MOCK_PLATFORM_SETTINGS];
}
export const superadminSettingsHandlers = [
    http.get(BASE_URL, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: mockSettings });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(400);
        const body = await request.json() as Record<string, unknown>;
        mockSettings = mockSettings.map(s => s.id === params.id ? { ...s, value: String(body.value ?? '') } : s);
        return HttpResponse.json({ success: true, message: 'Setting updated', data: mockSettings.find(s => s.id === params.id) });
    }),
];
