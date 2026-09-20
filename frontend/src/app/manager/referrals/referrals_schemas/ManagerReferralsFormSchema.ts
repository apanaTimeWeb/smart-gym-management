// RESPONSIBILITY: Defines validation rules for manually logging a referral.
import { z } from 'zod';
export const managerReferralFormSchema = z.object({ referrerName: z.string().min(2, 'Member name is required'), referrerId: z.string().min(1, 'Member ID is required'), refereeName: z.string().min(2, 'Inquiry name is required'), refereePhone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits') });
