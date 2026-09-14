import { http, HttpResponse, delay } from 'msw';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/onboarding_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/onboarding';

const initialMockOnboardings: TenantOnboarding[] = [
  {
    id: 'gym-1234', gymName: 'Flex Fitness Central', ownerName: 'Sarah Connor',
    adminEmail: 'sarah@flexfitness.com', phone: '+91 98765 43210', plan: 'ENTERPRISE',
    signupDate: '2024-01-15', trialEndsAt: null, trialStatus: 'CONVERTED',
    onboardingStatus: 'COMPLETED', emailVerified: true, welcomeEmailSent: true,
    daysInTrial: 14, trialDaysLeft: 0,
    checklist: [{ key: 'email_verified', label: 'Email Verified', done: true }],
  },
  {
    id: 'gym-5678', gymName: 'Iron Temple Barbell Club', ownerName: 'Arnold Strong',
    adminEmail: 'arnold@irontemple.com', phone: '+91 91234 56789', plan: 'PRO',
    signupDate: '2024-05-10', trialEndsAt: '2024-05-24', trialStatus: 'TRIAL',
    onboardingStatus: 'IN_PROGRESS', emailVerified: true, welcomeEmailSent: true,
    daysInTrial: 8, trialDaysLeft: 6,
    checklist: [{ key: 'email_verified', label: 'Email Verified', done: true }],
  },
];

let mockOnboardings = [...initialMockOnboardings];

export const superadminOnboardingHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<TenantOnboarding[]>>({
      success: true,
      message: 'Success',
      data: mockOnboardings,
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
      return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: 404 });
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
      return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: 404 });
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
    const { days } = (await request.json()) as { days: number };
    let updated: TenantOnboarding | null = null;
    mockOnboardings = mockOnboardings.map(t => {
      if (t.id === id) {
        updated = { ...t, trialDaysLeft: t.trialDaysLeft + days, trialStatus: 'TRIAL' };
        return updated;
      }
      return t;
    });
    if (!updated) {
      return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: 404 });
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
      return HttpResponse.json<ApiResponse<TenantOnboarding>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    }
    return HttpResponse.json<ApiResponse<TenantOnboarding>>({
      success: true,
      message: 'Converted',
      data: updated,
    });
  }),
];
