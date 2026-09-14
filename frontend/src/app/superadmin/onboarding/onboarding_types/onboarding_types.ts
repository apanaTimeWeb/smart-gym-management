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
  tenantName: z.string(),
  ownerEmail: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED']),
  step: z.number(),
  totalSteps: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});
