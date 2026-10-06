import type { managerReferralFormSchema } from '@/app/frontend_manager/manager_referrals/manager_referrals_schemas/ManagerReferralsFormSchema';
import type { z } from 'zod';

export type ManagerReferralFormValues = z.infer<typeof managerReferralFormSchema>;
/**
 * @description Provides the ManagerReferralsFormTypes implementation for the referrals module.
 * @dependencies @/app/frontend_manager/manager_referrals/manager_referrals_schemas/ManagerReferralsFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_REFERRAL_FORM: ManagerReferralFormValues = { referrerName: '', referrerId: '', refereeName: '', refereePhone: '' };
