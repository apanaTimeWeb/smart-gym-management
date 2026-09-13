import { MOCK_ONBOARDINGS } from '@/app/superadmin/onboarding/onboarding_types/onboarding_constants';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/onboarding_types';

let mockOnboardings = [...MOCK_ONBOARDINGS];

export const onboardingApi = {
  fetchOnboardings: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockOnboardings };
  },
  resendVerification: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockOnboardings = mockOnboardings.map(t => t.id === id ? { ...t, welcomeEmailSent: true } : t);
    return { success: true, message: 'Resent', data: mockOnboardings.find(t => t.id === id) as TenantOnboarding };
  },
  markVerified: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockOnboardings = mockOnboardings.map(t => t.id === id ? { ...t, emailVerified: true } : t);
    return { success: true, message: 'Verified', data: mockOnboardings.find(t => t.id === id) as TenantOnboarding };
  },
  extendTrial: async (id: string, days: number) => {
    await new Promise(r => setTimeout(r, 400));
    mockOnboardings = mockOnboardings.map(t => {
      if (t.id !== id) return t;
      return { ...t, trialDaysLeft: t.trialDaysLeft + days, trialStatus: 'TRIAL' };
    });
    return { success: true, message: 'Extended', data: mockOnboardings.find(t => t.id === id) as TenantOnboarding };
  },
  convertToPaid: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockOnboardings = mockOnboardings.map(t =>
      t.id === id
        ? { ...t, trialStatus: 'CONVERTED', onboardingStatus: 'COMPLETED', trialDaysLeft: 0 }
        : t
    );
    return { success: true, message: 'Converted', data: mockOnboardings.find(t => t.id === id) as TenantOnboarding };
  },
};
