// RESPONSIBILITY: Owns Referral form values and defaults.
import type { z } from 'zod';
import { managerReferralFormSchema } from '@/app/manager/referrals/referrals_schemas/ManagerReferralsFormSchema';
export type ManagerReferralFormValues = z.infer<typeof managerReferralFormSchema>;
export const EMPTY_REFERRAL_FORM: ManagerReferralFormValues = { referrerName: '', referrerId: '', refereeName: '', refereePhone: '' };
