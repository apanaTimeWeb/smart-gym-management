import { z } from 'zod';
import { MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, MANAGER_MEMBER_MAX_CUSTOM_DAYS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersValidationConstants';


/**
 * @description Provides the ManagerMembersFormSchema implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersValidationConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerMembersFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  address: z.string().optional(),
  aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must be exactly 12 digits').optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  billingCycle: z.string(), customDays: z.number().min(1, 'Please enter valid days').max(MANAGER_MEMBER_MAX_CUSTOM_DAYS, 'Custom days are too high').optional().or(z.literal(0)), planId: z.string().min(1, 'Please select a plan'),
  totalAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(), paidAmount: z.number().min(0, 'Amount must be valid').max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(), pendingAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(), advanceAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(),
  joinDate: z.string().optional(), expiryDate: z.string().optional(), medicalHistory: z.string().optional(), status: z.enum(['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']).optional(),
});
export type MemberFormValues = z.infer<typeof managerMembersFormSchema>;
