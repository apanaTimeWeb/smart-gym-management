import type { MemberFormValues } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';

/**
 * @description Provides the ManagerMembersSharedConstants implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema; ManagerMembersValidationConstants is intentionally separated for schema-only numeric limits
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
  medicalHistory: '' };



/** Fixed 30-day display grid for the attendance calendar UI */
export const ATTENDANCE_CALENDAR_DAYS = 30;

export function getPriceForCycle(plan: { price1Month: number; price3Month: number; price6Month: number; price12Month: number; priceCustom?: number } | undefined, cycle: string, customDays: number = 0): number {
  if (!plan) return 0;
  const map: Record<string, number> = {
    ONE_MONTH: plan.price1Month,
    THREE_MONTHS: plan.price3Month,
    SIX_MONTHS: plan.price6Month,
    TWELVE_MONTHS: plan.price12Month,
    CUSTOM: (plan.priceCustom || 0) * (customDays || 0) };
  return map[cycle] || 0;
}

export const MSG_TEMPLATES = {
  EXPIRED: (name: string) => `Hi ${name}! 🔔\n\nYour membership has expired. Renew today to continue your fitness journey!\n\n— Team GymSmart`,
  PENDING: (name: string, formattedAmount: string) => `Hi ${name} 🙏\n\nFriendly reminder: You have a pending amount of ${formattedAmount}. Please clear your dues at the earliest.\n\n— Team GymSmart`,
  DEFAULT: (name: string) => `Hi ${name}! 👋\n\nThis is a message from GymSmart. We hope you're enjoying your fitness journey!\n\n— Team GymSmart`
};

export const MEMBERS_TABLE_HEADERS = [
  { key: 'select', label: 'SELECT' },
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'MEMBER', sortable: true },
  { key: 'gender', label: 'GENDER' },
  { key: 'plan', label: 'PLAN' },
  { key: 'status', label: 'STATUS', sortable: true },
  { key: 'joinDate', label: 'JOIN DATE', sortable: true },
  { key: 'expiryDate', label: 'EXPIRY', sortable: true },
  { key: 'paidAmount', label: 'PAID', sortable: true },
  { key: 'pendingAmount', label: 'PENDING' },
  { key: 'actions', label: 'ACTIONS' },
] as const;
export const PROFILE_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'payments', label: 'Payments' },
  { id: 'workout', label: 'Workout Plan' },
  { id: 'diet', label: 'Diet Plan' }
];

export const MEMBER_PAYMENT_STATUS_VALUES = ['PAID', 'PENDING', 'FAILED', 'REFUNDED'] as const;

export const BILLING_CYCLE_VALUES = ['ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'TWELVE_MONTHS', 'CUSTOM'] as const;

export const MEMBER_PAID_STATUS = 'PAID' as const;

export const MEMBER_ATTENDANCE_EMPTY_STATUS = 'NONE' as const;

export const MEMBER_ACTIVE_STATUS = 'ACTIVE' as const;
export const MEMBER_FROZEN_STATUS = 'FROZEN' as const;
export const MEMBER_SUSPENDED_STATUS = 'SUSPENDED' as const;
export const BILLING_CYCLE_ONE_MONTH = 'ONE_MONTH' as const;
export const BILLING_CYCLE_THREE_MONTHS = 'THREE_MONTHS' as const;
export const BILLING_CYCLE_SIX_MONTHS = 'SIX_MONTHS' as const;
export const BILLING_CYCLE_TWELVE_MONTHS = 'TWELVE_MONTHS' as const;
export const BILLING_CYCLE_CUSTOM = 'CUSTOM' as const;
export const MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS = 1000000;
export const MANAGER_MEMBER_MAX_CUSTOM_DAYS = 3650;
