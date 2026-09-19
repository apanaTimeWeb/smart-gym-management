import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingTypes';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_ONBOARDINGS } from '@/app/superadmin/onboarding/onboarding_mocks/fixtures/SuperadminOnboardingMockFixtures';
const BASE_URL = '*/api/v1/superadmin/onboarding';
let mockOnboardings = [...MOCK_SUPERADMIN_ONBOARDINGS];

export function resetSuperadminOnboardingMockState(): void {
  mockOnboardings = [...MOCK_SUPERADMIN_ONBOARDINGS];
}
export const superadminOnboardingHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        let filtered = [...mockOnboardings];
        if (startDate || endDate) {
            filtered = filtered.filter(t => {
                if (!t.signupDate)
                    return true;
                const signup = new Date(t.signupDate);
                if (startDate && signup < new Date(startDate))
                    return false;
                if (endDate && signup > new Date(endDate))
                    return false;
                return true;
            });
        }
        if (search) {
            filtered = filtered.filter(t => t.gymName?.toLowerCase().includes(search) ||
                t.adminEmail?.toLowerCase().includes(search));
        }
        return HttpResponse.json<ApiResponse<TenantOnboarding[]>>({
            success: true,
            message: 'Success',
            data: filtered,
        });
    }),
    http.post(`${BASE_URL}/:id/resend-verification`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: TenantOnboarding | null = null;
        mockOnboardings = mockOnboardings.map(t => {
            if (t.id === id) {
                updated = { ...t, welcomeEmailSent: true };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<TenantOnboarding>>({
            success: true,
            message: 'Resent',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/:id/mark-verified`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: TenantOnboarding | null = null;
        mockOnboardings = mockOnboardings.map(t => {
            if (t.id === id) {
                updated = { ...t, emailVerified: true };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<TenantOnboarding>>({
            success: true,
            message: 'Verified',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/:id/extend-trial`, async ({ params, request }) => {
        await delay(400);
        const id = params.id as string;
        const { days } = (await request.json()) as {
            days: number;
        };
        let updated: TenantOnboarding | null = null;
        mockOnboardings = mockOnboardings.map(t => {
            if (t.id === id) {
                updated = { ...t, trialDaysLeft: t.trialDaysLeft + days, trialStatus: 'TRIAL' };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<TenantOnboarding>>({
            success: true,
            message: 'Extended',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/:id/convert-to-paid`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: TenantOnboarding | null = null;
        mockOnboardings = mockOnboardings.map(t => {
            if (t.id === id) {
                updated = { ...t, trialStatus: 'CONVERTED', onboardingStatus: 'COMPLETED', trialDaysLeft: 0 };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<TenantOnboarding>>({
            success: true,
            message: 'Converted',
            data: updated,
        });
    }),
];
