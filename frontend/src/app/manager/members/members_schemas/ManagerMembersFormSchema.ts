// RESPONSIBILITY: Defines Zod validation for the Manager create/edit member form.
import { z } from 'zod';

export const managerMembersFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  address: z.string().optional(),
  aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must be exactly 12 digits').optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  billingCycle: z.string(), customDays: z.number().min(1, 'Please enter valid days').optional().or(z.literal(0)), planId: z.string().min(1, 'Please select a plan'),
  totalAmount: z.number().min(0).optional(), paidAmount: z.number().min(0, 'Amount must be valid').optional(), pendingAmount: z.number().optional(), advanceAmount: z.number().optional(),
  joinDate: z.string().optional(), expiryDate: z.string().optional(), medicalHistory: z.string().optional(), status: z.enum(['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']).optional(),
});
export type MemberFormValues = z.infer<typeof managerMembersFormSchema>;
