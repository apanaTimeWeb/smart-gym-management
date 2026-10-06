import type { managerHrAdvanceFormSchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrAdvanceFormSchema';
import type { managerHrDueFormSchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrDueFormSchema';
import type { managerHrPayrollFormSchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrPayrollFormSchema';
import type { managerHrStaffFormSchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrStaffFormSchema';
import type { z } from 'zod';

export type ManagerHrAdvanceFormValues = z.infer<typeof managerHrAdvanceFormSchema>;
export type ManagerHrDueFormValues = z.infer<typeof managerHrDueFormSchema>;
export type StaffFormValues = z.infer<typeof managerHrStaffFormSchema>;
export type PayrollFormValues = z.infer<typeof managerHrPayrollFormSchema>;
/**
 * @description Provides the ManagerHrFormTypes implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrAdvanceFormSchema; @/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrDueFormSchema; @/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrPayrollFormSchema; @/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrStaffFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_STAFF: StaffFormValues = { name: '', email: '', phone: '', role: '', salary: 0, gender: 'MALE', address: '', joinDate: new Date().toISOString().split('T')[0] || '', temporaryPassword: '', isActive: true, aadhaar: '', upiId: '', advanceSalary: 0 };
export const EMPTY_PAYROLL_FORM: PayrollFormValues = { staffId: '', month: new Date().toISOString().slice(0, 7), amount: 0, paidAmount: 0, notes: '' };
export const EMPTY_HR_ADVANCE_FORM: ManagerHrAdvanceFormValues = { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' };
export const EMPTY_HR_DUE_FORM: ManagerHrDueFormValues = { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' };
