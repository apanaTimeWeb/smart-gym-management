import { z } from 'zod';

export const managerProfileFormSchema = z.object({
  name: z.string().trim().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().trim().min(7, 'Phone number is required'),
});

export const managerPasswordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm the new password'),
}).refine((values) => values.newPassword === values.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' });

export type ManagerProfileFormValues = z.infer<typeof managerProfileFormSchema>;
export type ManagerPasswordFormValues = z.infer<typeof managerPasswordFormSchema>;
