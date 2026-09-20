// RESPONSIBILITY: Owns TypeScript values and defaults for Inquiry and lead-conversion forms.
import { managerConvertLeadFormSchema } from '@/app/manager/inquiries/inquiries_schemas/ManagerConvertLeadFormSchema';
import { managerInquiriesFormSchema } from '@/app/manager/inquiries/inquiries_schemas/ManagerInquiriesFormSchema';
import type { z } from 'zod';

export type InquiryFormValues = z.infer<typeof managerInquiriesFormSchema>;
export type ConvertLeadFormValues = z.infer<typeof managerConvertLeadFormSchema>;
export const EMPTY_INQUIRY_FORM: InquiryFormValues = { name: '', phone: '', email: '', interest: '', status: 'NEW', source: 'Walk-in', notes: '' };
export const EMPTY_CONVERT_FORM: ConvertLeadFormValues = { name: '', email: '', phone: '', address: '', aadhaar: '', gender: 'MALE', billingCycle: 'ONE_MONTH', customDays: undefined, planId: '', joinDate: new Date().toISOString().split('T')[0] || '', expiryDate: '', totalAmount: 0, paidAmount: 0, pendingAmount: 0, medicalHistory: '' };
