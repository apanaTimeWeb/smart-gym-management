import type { Plan } from '@/lib/api';
import { z } from 'zod';

export const MemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  branch: z.string(),
  billingCycle: z.string(),
  planId: z.coerce.number().min(1, "Please select a plan"),
});

export type MemberFormValues = z.infer<typeof MemberSchema>;

export const MEMBERS_STATUS_COLORS: Record<string, string> = {
 ACTIVE: 'var(--members-status-active-bg) var(--members-status-active-text)',
 PENDING: 'var(--members-status-pending-bg) var(--members-status-pending-text)',
 EXPIRED: 'var(--members-status-expired-bg) var(--members-status-expired-text)',
};

export const MEMBERS_CYCLE_LABELS: Record<string, string> = {
 ONE_MONTH: '1 Month',
 THREE_MONTHS: '3 Months',
 SIX_MONTHS: '6 Months',
 TWELVE_MONTHS: '12 Months',
};

export const EMPTY_MEMBER_FORM = { 
 name: '', 
 email: '', 
 phone: '', 
 address: '', 
 gender: 'MALE', 
 branch: 'Main Branch', 
 billingCycle: 'ONE_MONTH', 
 planId: 1 
};

export const MEMBERS_TABLE_HEADERS = [
 'Member', 'Plan', 'Status', 'Billing Cycle', 'Paid', 'Pending', 'Expiry', 'Actions'
];

export const BRANCH_OPTIONS = ['Main Branch', 'Branch 2', 'Branch 3'] as const;

export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export function getPriceForCycle(plan: Plan | undefined, cycle: string): number {
 if (!plan) return 0;
 const map: Record<string, number> = {
 ONE_MONTH: plan.price1Month,
 THREE_MONTHS: plan.price3Month,
 SIX_MONTHS: plan.price6Month,
 TWELVE_MONTHS: plan.price12Month,
 };
 return map[cycle] || 0;
}
