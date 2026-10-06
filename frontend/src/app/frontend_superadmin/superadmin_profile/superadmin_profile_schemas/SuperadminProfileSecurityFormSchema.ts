/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminProfileSecurityFormSchema owned by the superadmin_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
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
