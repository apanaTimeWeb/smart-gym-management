import { MANAGER_INQUIRIES_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import type { managerConvertLeadFormSchema } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesConvertLeadFormSchema';
import type { managerInquiriesFormSchema } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesFormSchema';
import type { z } from 'zod';

export type InquiryFormValues = z.infer<typeof managerInquiriesFormSchema>;
export type ConvertLeadFormValues = z.infer<typeof managerConvertLeadFormSchema>;
/**
 * @description Provides the ManagerInquiriesFormTypes implementation for the inquiries module.
 * @dependencies @/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesConvertLeadFormSchema; @/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_INQUIRY_FORM: InquiryFormValues = { name: '', phone: '', email: '', interest: '', status: MANAGER_INQUIRIES_STATUS_VALUES.NEW, source: 'Walk-in', notes: '' };
export const EMPTY_CONVERT_FORM: ConvertLeadFormValues = { name: '', email: '', phone: '', address: '', aadhaar: '', gender: 'MALE', billingCycle: 'ONE_MONTH', customDays: undefined, planId: '', joinDate: new Date().toISOString().split('T')[0] || '', expiryDate: '', totalAmount: 0, paidAmount: 0, pendingAmount: 0, medicalHistory: '' };
