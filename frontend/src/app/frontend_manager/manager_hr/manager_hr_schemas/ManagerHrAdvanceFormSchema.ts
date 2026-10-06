import { z } from 'zod';
import { MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrSharedConstants';

/**
 * @description Provides the ManagerHrAdvanceFormSchema implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrSharedConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerHrAdvanceFormSchema = z.object({ staffId: z.string().min(1, 'Select a staff member.'), amount: z.number().max(MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').positive('Enter a valid amount.'), paymentMode: z.string().min(1, 'Select a payment mode.'), notes: z.string().max(500, 'Notes must be 500 characters or fewer.').optional().or(z.literal('')) });
