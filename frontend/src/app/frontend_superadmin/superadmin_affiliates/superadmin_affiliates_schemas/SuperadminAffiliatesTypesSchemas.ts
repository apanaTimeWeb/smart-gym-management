/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesTypesSchemas owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const AffiliateStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const AffiliateRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  referralCode: z.string(),
  totalReferred: z.number(),
  commissionEarned: z.number(),
  currency: z.string(),
  commissionRate: z.number().optional(),
  pendingPayout: z.number().optional(),
  bankDetails: z.string().optional(),
  status: AffiliateStatusSchema,
  joinedAt: z.string(),
  referralCount: z.number().optional(),
  conversionRate: z.number().optional(),
});

export const AffiliateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(80, 'Name cannot exceed 80 characters.'),
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  referralCode: z.string().min(4, 'Referral code must be at least 4 characters.').max(16, 'Referral code cannot exceed 16 characters.').regex(/^[A-Za-z0-9]+$/, 'Referral code must be alphanumeric only.'),
  currency: z.string().optional(),
  bankDetails: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const AffiliatePayoutRecordSchema = z.object({
  id: z.string(),
  affiliateId: z.string(),
  affiliateName: z.string(),
  amount: z.number(),
  currency: z.string(),
  method: z.enum(['BANK_TRANSFER', 'PAYPAL']),
  referenceId: z.string(),
  status: z.enum(['PENDING', 'COMPLETED']),
  paidAt: z.string(),
});
