// RESPONSIBILITY: Defines Zod validation rules for membership renewal and upgrade.
import { z } from 'zod';
import { MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, MANAGER_MEMBER_MAX_CUSTOM_DAYS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';


export const managerMembersRenewFormSchema = z.object({
  actionType: z.enum(['renew', 'upgrade']),
  planId: z.string().min(1, 'Please select a plan'),
  billingCycle: z.string().min(1, 'Billing cycle is required'),
  customDays: z.number().int().min(1, 'Please enter valid days').max(MANAGER_MEMBER_MAX_CUSTOM_DAYS, 'Custom days are too high').optional(),
  totalAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS),
  paidAmount: z.number().min(0, 'Amount must be valid').max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  newExpiryDate: z.string().min(1, 'Expiry date is required'),
});
