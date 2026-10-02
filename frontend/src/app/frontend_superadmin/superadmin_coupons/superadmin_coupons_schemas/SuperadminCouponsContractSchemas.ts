/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const CouponStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED', 'DEPLETED']);
export const RedemptionRecordSchema = z.object({
  id: z.string(),
  tenantName: z.string(),
  redeemedAt: z.string(),
  planName: z.string(),
  discountApplied: z.number(),
  currency: z.string().optional(),
});
export const CouponRecordSchema = z.object({
  id: z.string(),
  code: z.string(),
  discountType: z.enum(['PERCENTAGE', 'EXACT']),
  discountValue: z.number(),
  maxUses: z.number().int(),
  currentUses: z.number().int(),
  status: CouponStatusSchema,
  expiryDate: z.string(),
  isDeleted: z.boolean(),
  currency: z.string().optional(),
  redemptions: z.array(RedemptionRecordSchema).optional(),
});
export const CouponSchema = z.object({
  code: z.string().min(3, 'Coupon code must be at least 3 characters.').max(20, 'Coupon code cannot exceed 20 characters.').regex(/^[A-Z0-9-]+$/, 'Code must be uppercase letters, digits, and hyphens only.'),
  discountType: z.enum(['PERCENTAGE', 'EXACT'], { error: 'Select a discount type.' }),
  discountValue: z.number().positive('Discount value must be greater than zero.'),
  maxUses: z.number().int('Must be a whole number.').min(1, 'Must allow at least 1 use.'),
  expiryDate: z.string().min(1, 'Expiry date is required.').refine((val) => new Date(val) > new Date(), { message: 'Expiry date must be in the future.' }),
}).superRefine(({ discountType, discountValue }, ctx) => {
  if (discountType === 'PERCENTAGE' && discountValue > 100) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Percentage discount cannot exceed 100%.', path: ['discountValue'] });
  }
});
