import { z } from 'zod';

export const BroadcastSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(5, 'Content must be at least 5 characters'),
  audience: z.enum(['ALL_TENANTS', 'PRO_ONLY', 'SUSPENDED_ONLY']),
  status: z.enum(['DRAFT', 'SCHEDULED', 'SENT']),
  scheduledDate: z.string().optional().nullable(),
}).refine((data) => {
  if (data.status === 'SCHEDULED' && !data.scheduledDate) {
    return false;
  }
  return true;
}, {
  message: 'Scheduled date is required when status is SCHEDULED',
  path: ['scheduledDate'],
});

export type BroadcastFormData = z.infer<typeof BroadcastSchema>;

export const CouponSchema = z.object({
  code: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'EXACT']),
  discountValue: z.number().min(1, 'Discount value must be at least 1'),
  maxUses: z.number().min(1, 'Max uses must be at least 1'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
}).refine(data => {
  if (data.discountType === 'PERCENTAGE' && data.discountValue > 100) {
    return false;
  }
  return true;
}, {
  message: "Percentage discount cannot exceed 100",
  path: ["discountValue"]
});

export type CouponFormData = z.infer<typeof CouponSchema>;

export const AffiliateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  referralCode: z.string().min(3, 'Code must be at least 3 characters').regex(/^[A-Z0-9]+$/, 'Only uppercase letters and numbers allowed'),
});

export type AffiliateFormData = z.infer<typeof AffiliateSchema>;
