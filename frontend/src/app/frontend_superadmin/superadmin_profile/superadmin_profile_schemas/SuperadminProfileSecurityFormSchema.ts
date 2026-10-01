import { z } from 'zod';
export const passwordSchema = z
    .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
})
    .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'ui.passwords_do_not_match',
    path: ['confirmPassword'],
});
