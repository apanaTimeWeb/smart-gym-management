// RESPONSIBILITY: Defines Zod validation rules for membership renewal and upgrade.
import { z } from 'zod';

export const managerMembersRenewFormSchema = z.object({
  actionType: z.enum(['renew', 'upgrade']),
  planId: z.string().min(1, 'Please select a plan'),
  billingCycle: z.string().min(1, 'Billing cycle is required'),
  customDays: z.number().int().min(1, 'Please enter valid days').optional(),
  totalAmount: z.number().min(0),
  paidAmount: z.number().min(0, 'Amount must be valid'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  newExpiryDate: z.string().min(1, 'Expiry date is required'),
});
