// RESPONSIBILITY: Defines validation for staff advance payment entry.
import { z } from 'zod';
import { MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';

export const managerHrAdvanceFormSchema = z.object({ staffId: z.string().min(1, 'Select a staff member.'), amount: z.number().max(MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').positive('Enter a valid amount.'), paymentMode: z.string().min(1, 'Select a payment mode.'), notes: z.string().max(500, 'Notes must be 500 characters or fewer.').optional().or(z.literal('')) });
