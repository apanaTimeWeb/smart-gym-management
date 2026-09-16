import { z } from 'zod';

export const INQUIRIES_BILLING_CYCLE_VALUES = ['ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'TWELVE_MONTHS', 'CUSTOM'] as const;

export const ConvertLeadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(10, 'Valid phone is required'),
  address: z.string().optional(),
  aadhaar: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  billingCycle: z.enum(INQUIRIES_BILLING_CYCLE_VALUES),
  customDays: z.number().min(1).optional(),
  planId: z.string().min(1, 'Plan is required'),
  joinDate: z.string().min(1, 'Join date is required'),
  expiryDate: z.string().optional(),
  totalAmount: z.number().min(0).optional(),
  paidAmount: z.number().min(0).optional(),
  pendingAmount: z.number().min(0).optional(),
  medicalHistory: z.string().optional(),
});

export type ConvertLeadFormValues = z.infer<typeof ConvertLeadSchema>;
