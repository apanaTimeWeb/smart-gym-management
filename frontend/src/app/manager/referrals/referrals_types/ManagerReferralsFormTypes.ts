// RESPONSIBILITY: Owns Referral form values and defaults.
import { managerReferralFormSchema } from '@/app/manager/referrals/referrals_schemas/ManagerReferralsFormSchema';
import type { z } from 'zod';

export type ManagerReferralFormValues = z.infer<typeof managerReferralFormSchema>;
export const EMPTY_REFERRAL_FORM: ManagerReferralFormValues = { referrerName: '', referrerId: '', refereeName: '', refereePhone: '' };
