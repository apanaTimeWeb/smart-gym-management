import type { ConvertLeadFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerConvertLeadSchema';

export const INQUIRIES_CYCLE_LABELS: Record<string, string> = {
 ONE_MONTH: '1 Month',
 THREE_MONTHS: '3 Months',
 SIX_MONTHS: '6 Months',
 TWELVE_MONTHS: '12 Months',
 CUSTOM: 'Custom (Days)',
};

export const INQUIRIES_GENDER_OPTIONS = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' }
];

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

export const EMPTY_CONVERT_FORM: ConvertLeadFormValues = {
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

export interface PlanSnapshot {
  id: string;
  name: string;
  price1Month: number;
  price3Month: number;
  price6Month: number;
  price12Month: number;
  priceCustom?: number;
}

export function getPriceForCycleSnapshot(plan: PlanSnapshot | undefined, cycle: string, customDays: number = 0): number {
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
