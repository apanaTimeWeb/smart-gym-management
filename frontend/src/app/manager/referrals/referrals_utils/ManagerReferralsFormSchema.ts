import { z } from 'zod';

export const managerReferralFormSchema = z.object({
  referrerName: z.string().trim().min(2, 'Referrer name is required'),
  referrerId: z.string().trim().min(1, 'Member ID is required'),
  refereeName: z.string().trim().min(2, 'Inquiry name is required'),
  refereePhone: z.string().trim().min(7, 'Phone number is required'),
});
export type ManagerReferralFormValues = z.infer<typeof managerReferralFormSchema>;
