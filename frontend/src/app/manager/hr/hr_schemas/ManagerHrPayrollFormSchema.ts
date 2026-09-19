// RESPONSIBILITY: Defines validation for payroll disbursement records.
import { z } from 'zod';
export const managerHrPayrollFormSchema = z.object({ staffId: z.string().min(1, 'Please select staff'), month: z.string().min(1, 'Month is required'), amount: z.number().min(0, 'Amount must be positive'), paidAmount: z.number().min(0, 'Paid amount cannot be negative'), notes: z.string().optional() }).refine((data) => data.paidAmount <= data.amount, { message: 'Paid amount cannot exceed total amount', path: ['paidAmount'] });
