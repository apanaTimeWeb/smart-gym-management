// RESPONSIBILITY: Defines validation for payroll disbursement records.
import { z } from 'zod';
import { MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';

export const managerHrPayrollFormSchema = z.object({ staffId: z.string().min(1, 'Please select staff'), month: z.string().min(1, 'Month is required'), amount: z.number().min(0, 'Amount must be positive').max(MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large'), paidAmount: z.number().min(0, 'Paid amount cannot be negative').max(MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large'), notes: z.string().optional() }).refine((data) => data.paidAmount <= data.amount, { message: 'Paid amount cannot exceed total amount', path: ['paidAmount'] });
