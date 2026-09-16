// RESPONSIBILITY: Centralized constants, Zod schema, and shared utilities for the Members module. Single source of truth for form defaults, status colors, billing labels, and message templates.
import type { PlanWithCustom } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { z } from 'zod';
import { formatCurrency } from '@/lib/formatters';

export { formatCurrency };

import { MemberFormSchema as MemberSchema, type MemberFormType as MemberFormValues } from '@/app/manager/members/members_types/ManagerMembers.schema';
export { MemberSchema, type MemberFormValues };

export const MEMBERS_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: 'bg-success-bg', text: 'text-success' },
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning' },
  EXPIRED: { bg: 'bg-danger-bg', text: 'text-danger' },
  FROZEN: { bg: 'bg-info-bg', text: 'text-info' },
  SUSPENDED: { bg: 'bg-danger', text: 'text-white' },
  BANNED: { bg: 'bg-secondary/80', text: 'text-white' },
};

export const MEMBERS_CYCLE_LABELS: Record<string, string> = {
 ONE_MONTH: '1 Month',
 THREE_MONTHS: '3 Months',
 SIX_MONTHS: '6 Months',
 TWELVE_MONTHS: '12 Months',
 CUSTOM: 'Custom (Days)',
};

export const MEMBER_STATUS_OPTIONS = [
  { label: 'All Status', value: 'All' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Expired', value: 'EXPIRED' },
  { label: 'Frozen', value: 'FROZEN' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Banned', value: 'BANNED' }
];

/** Gender filter options for the Members toolbar (Rule 3B — centralized for API query param support). */
export const MEMBER_GENDER_OPTIONS = [
  { label: 'All Genders', value: 'All' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

export const MEMBER_EXPORT_FORMATS = [
  { label: 'Export CSV', value: 'csv' as const },
  { label: 'Export PDF', value: 'pdf' as const },
];


/** Status options for the Edit Member modal dropdown (no 'All Status' entry). (Rule 3B) */
export const MEMBER_EDIT_STATUS_OPTIONS = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Expired', value: 'EXPIRED' },
  { label: 'Frozen', value: 'FROZEN' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Banned', value: 'BANNED' },
];

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' }
];

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

export const EMPTY_MEMBER_FORM: MemberFormValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  aadhaar: '',
  gender: 'MALE',
  billingCycle: 'ONE_MONTH',
  planId: '',
  joinDate: today.toISOString().split('T')[0] || '',
  expiryDate: nextMonth.toISOString().split('T')[0] || '',
  medicalHistory: '',
};



/** Fixed 30-day display grid for the attendance calendar UI */
export const ATTENDANCE_CALENDAR_DAYS = 30;

export function getPriceForCycle(plan: PlanWithCustom | undefined, cycle: string, customDays: number = 0): number {
  if (!plan) return 0;
  const map: Record<string, number> = {
    ONE_MONTH: plan.price1Month,
    THREE_MONTHS: plan.price3Month,
    SIX_MONTHS: plan.price6Month,
    TWELVE_MONTHS: plan.price12Month,
    CUSTOM: (plan.priceCustom || 0) * (customDays || 0),
  };
  return map[cycle] || 0;
}

export const MSG_TEMPLATES = {
  EXPIRED: (name: string) => `Hi ${name}! 🔔\n\nYour membership has expired. Renew today to continue your fitness journey!\n\n— Team GymSmart`,
  PENDING: (name: string, formattedAmount: string) => `Hi ${name} 🙏\n\nFriendly reminder: You have a pending amount of ${formattedAmount}. Please clear your dues at the earliest.\n\n— Team GymSmart`,
  DEFAULT: (name: string) => `Hi ${name}! 👋\n\nThis is a message from GymSmart. We hope you're enjoying your fitness journey!\n\n— Team GymSmart`
};

export const MEMBERS_TABLE_HEADERS = ['ID', 'MEMBER', 'PLAN', 'STATUS', 'CYCLE', 'PAID', 'PENDING', 'EXPIRY', 'DIET', 'WORKOUT', 'TRAINER', 'ACTIONS'];
export const PROFILE_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'payments', label: 'Payments' },
  { id: 'workout', label: 'Workout Plan' },
  { id: 'diet', label: 'Diet Plan' }
];
