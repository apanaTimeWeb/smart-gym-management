/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminProfileMockHandlers owned by the superadmin_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_fixtures/SuperadminProfileMockFixtures, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { MOCK_SUPERADMIN_PROFILE } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_fixtures/SuperadminProfileMockFixtures';

import type { SuperadminProfileData } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';
import type { ApiResponse } from '@/lib/api';



const BASE_URL = '*/superadmin/profile';
let mockProfile: SuperadminProfileData = { ...MOCK_SUPERADMIN_PROFILE };

export function resetSuperadminProfileMockState(): void {
  mockProfile = { ...MOCK_SUPERADMIN_PROFILE };
}
export const superadminProfileHandlers = [
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<SuperadminProfileData>>({ success: true, message: 'Success', data: mockProfile });
    }),
    http.patch(BASE_URL, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Record<string, unknown>;
        mockProfile = { ...mockProfile, ...body };
        return HttpResponse.json<ApiResponse<SuperadminProfileData>>({ success: true, message: 'Profile updated', data: mockProfile });
    }),
    http.patch(`${BASE_URL}/password`, async () => {
        await delay(600);
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Password updated successfully', data: null });
    }),
    http.patch(`${BASE_URL}/2fa`, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Record<string, unknown>;
        mockProfile.twoFactorEnabled = Boolean(body.enabled);
        return HttpResponse.json<ApiResponse<SuperadminProfileData>>({ success: true, message: '2FA toggled', data: mockProfile });
    }),

    http.post('*/api/v1/superadmin/superadmin_export_data', async () => {
        await delay(300);
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Export started. You will receive an email with a secure download link within a few minutes.', data: null }, { status: StatusCodes.ACCEPTED });
    }),
];
