import { http, HttpResponse, delay } from 'msw';
import type { SuperadminProfileData } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
import { MOCK_SUPERADMIN_PROFILE } from '@/app/superadmin/profile/profile_mocks/fixtures/SuperadminProfileMockFixtures';
import type { ApiResponse } from '@/lib/api';
const BASE_URL = '*/superadmin/profile';
let mockProfile: SuperadminProfileData = { ...MOCK_SUPERADMIN_PROFILE };
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
];
