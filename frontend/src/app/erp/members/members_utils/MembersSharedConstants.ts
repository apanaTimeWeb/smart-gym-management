// RESPONSIBILITY: Contains logic, types, or component definition for this module.
import type { Plan } from '@/app/erp/plans/plans_types/plans_types';
import { z } from 'zod';

export const MemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  billingCycle: z.string(),
  customDays: z.coerce.number().min(1, "Please enter valid days").optional(),
  planId: z.string().min(1, "Please select a plan"),
});

export type MemberFormValues = z.infer<typeof MemberSchema>;

export const MEMBERS_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
 ACTIVE: { bg: 'bg-success-bg', text: 'text-success' },
 PENDING: { bg: 'bg-warning-bg', text: 'text-warning' },
 EXPIRED: { bg: 'bg-danger-bg', text: 'text-danger' },
};

export const MEMBERS_CYCLE_LABELS: Record<string, string> = {
 ONE_MONTH: '1 Month',
 THREE_MONTHS: '3 Months',
 SIX_MONTHS: '6 Months',
 TWELVE_MONTHS: '12 Months',
 CUSTOM: 'Custom (Days)',
};

export const EMPTY_MEMBER_FORM = { 
 name: '', 
 email: '', 
 phone: '', 
 address: '', 
 gender: 'MALE', 
 billingCycle: 'ONE_MONTH', 
 planId: '' 
} as unknown as MemberFormValues;

export const MEMBERS_TABLE_HEADERS = [
 'Member', 'Plan', 'Status', 'Billing Cycle', 'Paid', 'Pending', 'Expiry', 'Actions'
];

export const BRANCH_OPTIONS = ['Main Branch', 'Branch 2', 'Branch 3'] as const;

export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export function getPriceForCycle(plan: Plan | undefined, cycle: string, customDays: number = 0): number {
 if (!plan) return 0;
 const map: Record<string, number> = {
 ONE_MONTH: plan.price1Month,
 THREE_MONTHS: plan.price3Month,
 SIX_MONTHS: plan.price6Month,
 TWELVE_MONTHS: plan.price12Month,
 CUSTOM: ((plan as any).priceCustom || 0) * (customDays || 0),
 };
 return map[cycle] || 0;
}

export const MSG_TEMPLATES = {
  EXPIRED: (name: string) => `Hi ${name}! 🔔\n\nYour membership has expired. Renew today to continue your fitness journey!\n\n— Team GymSmart`,
  PENDING: (name: string, formattedAmount: string) => `Hi ${name} 🙏\n\nFriendly reminder: You have a pending amount of ${formattedAmount}. Please clear your dues at the earliest.\n\n— Team GymSmart`,
  DEFAULT: (name: string) => `Hi ${name}! 👋\n\nThis is a message from GymSmart. We hope you're enjoying your fitness journey!\n\n— Team GymSmart`
};

