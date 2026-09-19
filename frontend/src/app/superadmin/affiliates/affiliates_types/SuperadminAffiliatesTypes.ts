// RESPONSIBILITY: Defines affiliate domain, form, response, and payout-history contracts for the Superadmin module.
import { z } from 'zod';

export const AffiliateStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);
export type AffiliateStatus = z.infer<typeof AffiliateStatusSchema>;
/** Filter tabs for the Affiliates status dropdown. */
export type AffiliateStatusFilter = 'ALL' | AffiliateStatus;

export const AffiliateRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  referralCode: z.string(),
  totalReferred: z.number(),
  commissionEarned: z.number(),
  commissionRate: z.number().optional(),
  pendingPayout: z.number().optional(),
  bankDetails: z.string().optional(),
  status: AffiliateStatusSchema,
  joinedAt: z.string(),
  referralCount: z.number().optional(),
  conversionRate: z.number().optional(),
});
export type Affiliate = z.infer<typeof AffiliateRecordSchema>;

export const AffiliateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(80, 'Name cannot exceed 80 characters.'),
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  referralCode: z.string().min(4, 'Referral code must be at least 4 characters.').max(16, 'Referral code cannot exceed 16 characters.').regex(/^[A-Za-z0-9]+$/, 'Referral code must be alphanumeric only.'),
});
export type AffiliateFormData = z.infer<typeof AffiliateSchema>;

export const AffiliatePayoutRecordSchema = z.object({
  id: z.string(),
  affiliateId: z.string(),
  affiliateName: z.string(),
  amount: z.number(),
  method: z.enum(['BANK_TRANSFER', 'PAYPAL']),
  referenceId: z.string(),
  status: z.enum(['PENDING', 'COMPLETED']),
  paidAt: z.string(),
});
export type AffiliatePayoutRecord = z.infer<typeof AffiliatePayoutRecordSchema>;
