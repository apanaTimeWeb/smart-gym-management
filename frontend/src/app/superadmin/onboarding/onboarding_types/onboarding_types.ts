import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Tenant Onboarding module.

export type OnboardingStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'STALLED';
export type TrialStatus = 'TRIAL' | 'ACTIVE' | 'EXPIRED' | 'CONVERTED';
export type ChecklistItem = {
  key: string;
  label: string;
  done: boolean;
};

export interface TenantOnboarding {
  id: string;
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  plan: string;
  signupDate: string;
  trialEndsAt: string | null;
  trialStatus: TrialStatus;
  onboardingStatus: OnboardingStatus;
  emailVerified: boolean;
  welcomeEmailSent: boolean;
  checklist: ChecklistItem[];
  daysInTrial: number;
  trialDaysLeft: number;
}


export const TenantOnboardingSchema = z.object({
  id: z.string(),
  gymName: z.string(),
  ownerName: z.string(),
  adminEmail: z.string(),
  phone: z.string(),
  plan: z.string(),
  signupDate: z.string(),
  trialEndsAt: z.string().nullable(),
  trialStatus: z.enum(['TRIAL', 'ACTIVE', 'EXPIRED', 'CONVERTED']),
  onboardingStatus: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'STALLED']),
  emailVerified: z.boolean(),
  welcomeEmailSent: z.boolean(),
  checklist: z.array(z.object({
    key: z.string(),
    label: z.string(),
    done: z.boolean()
  })),
  daysInTrial: z.number(),
  trialDaysLeft: z.number()
});
