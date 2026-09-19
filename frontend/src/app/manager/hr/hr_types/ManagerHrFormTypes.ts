// RESPONSIBILITY: Owns TypeScript form types and defaults for Manager HR forms.
import type { z } from 'zod';
import { managerHrAdvanceFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrAdvanceFormSchema';
import { managerHrDueFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrDueFormSchema';
import { managerHrStaffFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrStaffFormSchema';
import { managerHrPayrollFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrPayrollFormSchema';
export type ManagerHrAdvanceFormValues = z.infer<typeof managerHrAdvanceFormSchema>;
export type ManagerHrDueFormValues = z.infer<typeof managerHrDueFormSchema>;
export type StaffFormValues = z.infer<typeof managerHrStaffFormSchema>;
export type PayrollFormValues = z.infer<typeof managerHrPayrollFormSchema>;
export const EMPTY_STAFF: StaffFormValues = { name: '', email: '', phone: '', role: '', salary: 0, gender: 'MALE', address: '', joinDate: new Date().toISOString().split('T')[0] || '', temporaryPassword: '', isActive: true, aadhaar: '', upiId: '', advanceSalary: 0 };
export const EMPTY_PAYROLL_FORM: PayrollFormValues = { staffId: '', month: new Date().toISOString().slice(0, 7), amount: 0, paidAmount: 0, notes: '' };
export const EMPTY_HR_ADVANCE_FORM: ManagerHrAdvanceFormValues = { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' };
export const EMPTY_HR_DUE_FORM: ManagerHrDueFormValues = { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' };
